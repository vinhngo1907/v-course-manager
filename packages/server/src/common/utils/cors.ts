import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

/**
 * Checks if an origin matches a pattern with wildcard support
 *
 * Supported patterns:
 * - '*' → Matches all origins
 * - '*.example.com' → Matches any subdomain of example.com (protocol auto-detected from origin)
 * - 'https://*.example.com' → Matches HTTPS subdomains only
 * - 'https://app.example.com' → Exact match
 * - 'http://localhost:*' → Matches localhost with any port
 *
 * @param origin The origin to check (e.g., 'https://us.kol.ambercare.app')
 * @param pattern The pattern to match against (e.g., '*.ambercare.app' or 'https://*.ambercare.app')
 * @returns True if the origin matches the pattern
 */
export function matchesOriginPattern(origin: string, pattern: string): boolean {
  // Exact wildcard match - allow all
  if (pattern === '*') {
    return true;
  }

  // Exact match
  if (origin === pattern) {
    return true;
  }

  // Smart protocol handling: if pattern doesn't have a protocol but origin does,
  // extract the protocol from origin and prepend it to the pattern
  let normalizedPattern = pattern;
  const originHasProtocol = /^https?:\/\//.test(origin);
  const patternHasProtocol = /^https?:\/\//.test(pattern);

  if (originHasProtocol && !patternHasProtocol) {
    // Extract protocol from origin (e.g., 'https://')
    const protocolMatch = origin.match(/^(https?:\/\/)/);
    if (protocolMatch) {
      normalizedPattern = protocolMatch[1] + pattern;
    }
  }

  // Wildcard pattern matching
  if (normalizedPattern.includes('*')) {
    // Convert pattern to regex
    // Escape special regex characters except *
    const regexPattern = normalizedPattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');

    const regex = new RegExp(`^${regexPattern}$`, 'i');
    return regex.test(origin);
  }

  // Final exact match check with normalized pattern
  return origin === normalizedPattern;
}

/**
 * Creates a CORS options object with wildcard pattern support
 *
 * @param allowedOrigins Comma-separated list of allowed origins (supports wildcards)
 * @returns CORS configuration for NestJS
 *
 * @example
 * // Allow all origins (no credentials)
 * createCorsOptions('*')
 *
 * @example
 * // Allow specific wildcard patterns
 * createCorsOptions('*.ambercare.app,http://localhost:*')
 *
 * @example
 * // Allow exact origins
 * createCorsOptions('https://us.kol.ambercare.app,https://vietnam.kol.ambercare.app')
 */
export function createCorsOptions(allowedOrigins: string): CorsOptions {
  const patterns = allowedOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  // If wildcard is present, disable credentials for security
  const hasWildcard = patterns.includes('*');
  const credentials = !hasWildcard;

  // Origin validation callback using simpler function signature
  const originCallback = (
    requestOrigin: string | undefined,

    callback: (err: Error | null, allow?: any) => void,
  ) => {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!requestOrigin) {
      callback(null, true);
      return;
    }

    // Check if origin matches any pattern
    const isAllowed = patterns.some((pattern) =>
      matchesOriginPattern(requestOrigin, pattern),
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(
        new Error(
          `Origin '${requestOrigin}' is not allowed by CORS policy. Allowed patterns: ${patterns.join(
            ', ',
          )}`,
        ),
        false,
      );
    }
  };

  return {
    origin: originCallback,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  };
}
