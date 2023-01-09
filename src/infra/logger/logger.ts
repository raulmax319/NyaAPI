import { Logger as Tslog } from 'tslog';

export class Logger {
  private logger: Tslog;

  public static shared = new Logger();

  private constructor() {
    this.logger = new Tslog();
  }

  info(...message: unknown[]) {
    this.logger.info(message);
  }

  error(...message: unknown[]) {
    this.logger.error(message);
  }

  warn(...message: unknown[]) {
    this.logger.warn(message);
  }

  debug(...message: unknown[]) {
    this.logger.debug(message);
  }
}
