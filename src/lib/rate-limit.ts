interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitOptions {
  limit: number;
  windowMs: number;
  keyGenerator?: (identifier: string) => string;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  totalHits: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  private generateKey(identifier: string, options: RateLimitOptions): string {
    if (options.keyGenerator) {
      return options.keyGenerator(identifier);
    }
    return `rate_limit:${identifier}`;
  }

  checkLimit(
    identifier: string, 
    options: RateLimitOptions
  ): RateLimitResult {
    const key = this.generateKey(identifier, options);
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + options.windowMs,
      };
      this.store.set(key, newEntry);

      return {
        allowed: true,
        remaining: options.limit - 1,
        resetTime: newEntry.resetTime,
        totalHits: 1,
      };
    }

    if (entry.count >= options.limit) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        totalHits: entry.count,
      };
    }

    // Increment counter
    entry.count++;
    this.store.set(key, entry);

    return {
      allowed: true,
      remaining: options.limit - entry.count,
      resetTime: entry.resetTime,
      totalHits: entry.count,
    };
  }

  reset(identifier: string, options: RateLimitOptions): void {
    const key = this.generateKey(identifier, options);
    this.store.delete(key);
  }

  getRemaining(identifier: string, options: RateLimitOptions): number {
    const key = this.generateKey(identifier, options);
    const entry = this.store.get(key);
    
    if (!entry || Date.now() > entry.resetTime) {
      return options.limit;
    }
    
    return Math.max(0, options.limit - entry.count);
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Global rate limiter instance
const rateLimiter = new RateLimiter();

// Predefined rate limit configurations
export const RATE_LIMITS = {
  // API routes
  API_GENERAL: { limit: 100, windowMs: 15 * 60 * 1000 }, // 100 requests per 15 minutes
  API_STRICT: { limit: 20, windowMs: 60 * 1000 }, // 20 requests per minute
  
  // Auth routes
  AUTH_LOGIN: { limit: 5, windowMs: 15 * 60 * 1000 }, // 5 login attempts per 15 minutes
  AUTH_REGISTER: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 registrations per hour
  AUTH_RESET: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 password resets per hour
  
  // Email sending
  EMAIL_SEND: { limit: 10, windowMs: 60 * 60 * 1000 }, // 10 emails per hour
  
  // File uploads
  FILE_UPLOAD: { limit: 5, windowMs: 60 * 1000 }, // 5 uploads per minute
  
  // Report generation
  REPORT_GENERATE: { limit: 3, windowMs: 60 * 1000 }, // 3 reports per minute
} as const;

// Main rate limiting function
export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  return rateLimiter.checkLimit(identifier, options);
}

// Convenience functions for common use cases
export function rateLimitByIP(ip: string, config: keyof typeof RATE_LIMITS): RateLimitResult {
  return rateLimiter.checkLimit(ip, RATE_LIMITS[config]);
}

export function rateLimitByUser(userId: string, config: keyof typeof RATE_LIMITS): RateLimitResult {
  return rateLimiter.checkLimit(`user:${userId}`, RATE_LIMITS[config]);
}

export function rateLimitByEmail(email: string, config: keyof typeof RATE_LIMITS): RateLimitResult {
  return rateLimiter.checkLimit(`email:${email.toLowerCase()}`, RATE_LIMITS[config]);
}

// Utility functions
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.totalHits.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  };
}

export function isRateLimited(result: RateLimitResult): boolean {
  return !result.allowed;
}

// Cleanup function for graceful shutdown
export function destroyRateLimiter(): void {
  rateLimiter.destroy();
}
