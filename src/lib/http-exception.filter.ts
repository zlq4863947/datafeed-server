import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, response: any) {
    console.log(new Date().toLocaleString(), '- do HttpExceptionFilter');
    const status = exception.getStatus();
    const errmsg = typeof exception.getResponse() === 'string' ? exception.getResponse() : (<Error>exception.getResponse()).message;
    response.status(status).json({ s: 'error', errmsg });
  }
}
