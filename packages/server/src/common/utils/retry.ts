import { Logger } from '@nestjs/common';

/**
 * Options for retry helper
 */
export interface RetryOptions {
  /**
   * Maximum number of attempts (including the initial attempt)
   * @example 3 means: 1 initial + 2 retries
   */
  maxAttempts: number;

  /**
   * Delay in milliseconds before each attempt
   * Array length should match maxAttempts
   * @example [0, 10_000, 30_000] means: immediate, wait 10s, wait 30s
   */
  delays: number[];

  /**
   * Optional callback when retry occurs
   * @param attempt - Current attempt number (1-based)
   * @param error - Error that triggered the retry
   */
  onRetry?: (attempt: number, error: Error) => void;

  /**
   * Optional callback when all retries exhausted
   * @param lastError - The final error after all retries
   */
  onExhausted?: (lastError: Error) => void;
}

/**
 * Generic retry helper utility
 *
 * Provides configurable retry logic with delays for any async operation.
 * Useful for handling transient failures like network issues, service downtime, etc.
 *
 * @example
 * ```typescript
 * // Retry RabbitMQ publish with 3 attempts (0s, 10s, 30s delays)
 * await RetryHelper.withRetry(
 *   () => this.rabbitMQClient.publish(message),
 *   {
 *     maxAttempts: 3,
 *     delays: [0, 10_000, 30_000],
 *     onRetry: (attempt, error) => {
 *       logger.warn(`Retry attempt ${attempt}: ${error.message}`);
 *     }
 *   }
 * );
 * ```
 */
export class RetryHelper {
  private static readonly logger = new Logger('RetryHelper');

  /**
   * Execute an async function with automatic retry on failure
   *
   * @param fn - Async function to execute
   * @param options - Retry configuration
   * @returns Result of successful execution
   * @throws Last error if all attempts fail
   */
  static async withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions,
  ): Promise<T> {
    const { maxAttempts, delays, onRetry, onExhausted } = options;

    let lastError: Error;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        // Wait before retry (except first attempt)
        if (delays[attempt] > 0) {
          await this.sleep(delays[attempt]);
        }

        // Execute function
        const result = await fn();
        return result; // Success - return result
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // If not last attempt, call onRetry callback
        if (attempt < maxAttempts - 1) {
          onRetry?.(attempt + 1, lastError);
        }
      }
    }

    // All attempts failed
    onExhausted?.(lastError!);

    // Throw last error
    throw lastError!;
  }

  /**
   * Sleep helper
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
