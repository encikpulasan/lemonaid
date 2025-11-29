/**
 * Logging utility with different log levels.
 * Suitable for both development and production (Deno Deploy).
 */

import { getConfig } from "./config.ts";

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

/**
 * Logger class for structured logging.
 */
class Logger {
  private minLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    const config = getConfig();
    this.isDevelopment = config.ENV === "development";
    this.minLevel = this.isDevelopment ? "debug" : "info";
  }

  /**
   * Checks if a log level should be output.
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ["debug", "info", "warn", "error"];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  /**
   * Formats log entry for output.
   */
  private format(entry: LogEntry): string {
    const { level, message, timestamp, data } = entry;
    const levelColor = this.getLevelColor(level);
    const reset = "\x1b[0m";
    const levelStr = this.isDevelopment
      ? `${levelColor}[${level.toUpperCase()}]${reset}`
      : `[${level.toUpperCase()}]`;

    let output = `${timestamp} ${levelStr} ${message}`;

    if (data !== undefined) {
      const dataStr = typeof data === "object"
        ? JSON.stringify(data, null, this.isDevelopment ? 2 : 0)
        : String(data);
      output += ` ${dataStr}`;
    }

    return output;
  }

  /**
   * Gets color code for log level.
   */
  private getLevelColor(level: LogLevel): string {
    if (!this.isDevelopment) return "";
    const colors: Record<LogLevel, string> = {
      debug: "\x1b[36m", // Cyan
      info: "\x1b[32m", // Green
      warn: "\x1b[33m", // Yellow
      error: "\x1b[31m", // Red
    };
    return colors[level] || "";
  }

  /**
   * Writes log entry.
   */
  private write(level: LogLevel, message: string, data?: unknown): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    const formatted = this.format(entry);

    // Use appropriate console method
    switch (level) {
      case "debug":
      case "info":
        console.log(formatted);
        break;
      case "warn":
        console.warn(formatted);
        break;
      case "error":
        console.error(formatted);
        break;
    }
  }

  /**
   * Logs a debug message.
   */
  debug(message: string, data?: unknown): void {
    this.write("debug", message, data);
  }

  /**
   * Logs an info message.
   */
  info(message: string, data?: unknown): void {
    this.write("info", message, data);
  }

  /**
   * Logs a warning message.
   */
  warn(message: string, data?: unknown): void {
    this.write("warn", message, data);
  }

  /**
   * Logs an error message.
   */
  error(message: string, data?: unknown): void {
    this.write("error", message, data);
  }

  /**
   * Logs HTTP request.
   */
  request(method: string, path: string, status?: number, duration?: number): void {
    const parts = [method, path];
    if (status) parts.push(String(status));
    if (duration !== undefined) parts.push(`${duration}ms`);
    this.info(parts.join(" "));
  }
}

/**
 * Global logger instance.
 */
export const logger = new Logger();

/**
 * Convenience functions for direct logging.
 */
export const log = {
  debug: (message: string, data?: unknown) => logger.debug(message, data),
  info: (message: string, data?: unknown) => logger.info(message, data),
  warn: (message: string, data?: unknown) => logger.warn(message, data),
  error: (message: string, data?: unknown) => logger.error(message, data),
  request: (method: string, path: string, status?: number, duration?: number) =>
    logger.request(method, path, status, duration),
};

