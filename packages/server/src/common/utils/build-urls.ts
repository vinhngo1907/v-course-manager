/**
 * Concatenates a base URL with a path, properly handling slashes
 * @param baseUrl The base URL (with or without trailing slash)
 * @param path The path to append (with or without leading slash)
 * @returns The properly concatenated URL
 */
interface BuildUrlOptions {
  trailingSlash?: boolean; // add slash at the end of final URL
}

export function buildUrl(
  baseUrl: string,
  path: string,
  options: BuildUrlOptions = {},
): string {
  // Remove trailing slash from baseUrl
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  // Remove leading slash from path
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  let url = `${normalizedBase}/${normalizedPath}`;

  if (options.trailingSlash) {
    if (!url.endsWith('/')) url += '/';
  } else {
    if (url.endsWith('/')) url = url.slice(0, -1);
  }

  return url;
}
