import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    console.time('Request-response time');
    const queryString = req?.query?.keyword;
    const baseUrl = req?.baseUrl;
    const typeOfRequest =
      baseUrl === '/jokes/search-joke'
        ? `Search by keyword ${queryString}`
        : 'Random';

    res.on('finish', () => {
      console.log(`${typeOfRequest} joke request done`);
      console.timeEnd('Request-response time');
    });
    next();
  }
}
