interface ErrorContext {
  userId?: string;
  userAgent?: string;
  ip?: string;
  url?: string;
  method?: string;
  timestamp?: Date;
  additionalData?: Record<string, any>;
}

interface ErrorLog {
  message: string;
  stack?: string;
  context: ErrorContext;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 1000; // Keep last 1000 logs in memory

  private getSeverity(error: Error, context: ErrorContext): 'low' | 'medium' | 'high' | 'critical' {
    // Determine severity based on error type and context
    if (error.name === 'ValidationError') return 'low';
    if (error.name === 'AuthenticationError') return 'medium';
    if (error.name === 'DatabaseError') return 'high';
    if (error.name === 'NetworkError') return 'medium';
    if (error.message.includes('rate limit')) return 'medium';
    if (error.message.includes('unauthorized')) return 'high';
    if (context.url?.includes('/api/')) return 'medium';
    return 'low';
  }

  private formatError(error: Error, context: ErrorContext): ErrorLog {
    return {
      message: error.message,
      stack: error.stack,
      context: {
        ...context,
        timestamp: context.timestamp || new Date(),
      },
      severity: this.getSeverity(error, context),
    };
  }

  private addToLogs(errorLog: ErrorLog): void {
    this.logs.push(errorLog);
    
    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  logError(error: Error, context: ErrorContext = {}): void {
    const errorLog = this.formatError(error, context);
    
    // Add to in-memory logs
    this.addToLogs(errorLog);
    
    // Log to console with appropriate level
    const logMessage = `[${errorLog.severity.toUpperCase()}] ${errorLog.message}`;
    const logContext = {
      ...errorLog.context,
      severity: errorLog.severity,
    };

    switch (errorLog.severity) {
      case 'critical':
      case 'high':
        console.error(logMessage, logContext);
        break;
      case 'medium':
        console.warn(logMessage, logContext);
        break;
      case 'low':
        console.info(logMessage, logContext);
        break;
    }

    // In production, you might want to send to external logging service
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalLogger(errorLog);
    }
  }

  private sendToExternalLogger(errorLog: ErrorLog): void {
    // Example: Send to Sentry if configured
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // This would integrate with Sentry SDK
      console.log('Would send to Sentry:', errorLog);
    }

    // Example: Send to other logging services
    // - LogRocket
    // - DataDog
    // - New Relic
    // - Custom logging endpoint
  }

  getRecentErrors(limit: number = 50): ErrorLog[] {
    return this.logs.slice(-limit);
  }

  getErrorsBySeverity(severity: ErrorLog['severity']): ErrorLog[] {
    return this.logs.filter(log => log.severity === severity);
  }

  getErrorsByUser(userId: string): ErrorLog[] {
    return this.logs.filter(log => log.context.userId === userId);
  }

  clearLogs(): void {
    this.logs = [];
  }

  getStats(): {
    total: number;
    bySeverity: Record<string, number>;
    recent: number;
  } {
    const bySeverity = this.logs.reduce((acc, log) => {
      acc[log.severity] = (acc[log.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recent = this.logs.filter(log => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      return log.context.timestamp && log.context.timestamp > oneHourAgo;
    }).length;

    return {
      total: this.logs.length,
      bySeverity,
      recent,
    };
  }
}

// Global error logger instance
const errorLogger = new ErrorLogger();

// Main function to log errors
export function logError(error: Error, context: ErrorContext = {}): void {
  errorLogger.logError(error, context);
}

// Convenience functions for common error types
export function logValidationError(error: Error, context: ErrorContext = {}): void {
  logError(error, { ...context, additionalData: { type: 'validation' } });
}

export function logAuthError(error: Error, context: ErrorContext = {}): void {
  logError(error, { ...context, additionalData: { type: 'authentication' } });
}

export function logDatabaseError(error: Error, context: ErrorContext = {}): void {
  logError(error, { ...context, additionalData: { type: 'database' } });
}

export function logApiError(error: Error, context: ErrorContext = {}): void {
  logError(error, { ...context, additionalData: { type: 'api' } });
}

// Error boundary helper for React components
export function createErrorBoundaryHandler(componentName: string) {
  return (error: Error, errorInfo: any) => {
    logError(error, {
      additionalData: {
        type: 'react_error_boundary',
        componentName,
        componentStack: errorInfo.componentStack,
      },
    });
  };
}

// Async error wrapper for API routes
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context: ErrorContext = {}
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error as Error, context);
      throw error;
    }
  };
}

// Get error statistics (useful for monitoring)
export function getErrorStats() {
  return errorLogger.getStats();
}

// Get recent errors (useful for debugging)
export function getRecentErrors(limit: number = 50) {
  return errorLogger.getRecentErrors(limit);
}

// Clear all logs (useful for testing)
export function clearErrorLogs() {
  errorLogger.clearLogs();
}

// Custom error classes
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500);
    this.name = 'DatabaseError';
  }
}
