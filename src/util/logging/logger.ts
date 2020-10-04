import { createLogger, format, Logger, transports } from 'winston';

export const logger: Logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.prettyPrint()
      ),
    }),
    new transports.File({
      format: format.timestamp(),
      filename: 'combined.log'
    })
  ],
  handleExceptions: true
});
