import { Request, Response } from 'express';
// eslint-disable-next-line prettier/prettier
import { Controller, Get, Header, Req, Param, Query, BadRequestException, Res, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 컨트롤러 내 핸들러의 파라미터에 데코레이터로 가능한 종류
  // @Query(), @Param(key?: string) , @Body
  @Header('X-Custom', 'Test Header')
  @Get('he*lo/:name')
  getHeXlo(
    @Req() req: Request,
    @Res() res: Response,
    @Param('name') name: string,
    @Query('key') key?: string,
  ): Response {
    if (parseInt(key) <= 0) {
      throw new BadRequestException('key Should be bigger then 0');
    }
    const heXlo = this.appService.getHeXlo(name, key);

    res.append('X-Custom-Location', `${req.path}/${key}`);

    return res.status(200).send(heXlo);
  }

  @Redirect('', 301)
  @Get('hellos')
  getHellos(@Query('key') key?: string): object {
    const url = key ? 'hello/world?key=' + key : '/';
    return {
      url: url,
    };
  }

  @Get('hello/:name/:key')
  getHelloNameKey(@Param() params: { [key: string]: string }): string {
    return `${params.name || 'somebody'} has ${params.key || 'nothing'}`;
    //path param 으로 들어오는 값은 타입이 항상 string이고,
    //없으면 해당 컨드롤러에 맵핑되지 않기 때문에 ${xx || default} 부분은 무쓸모...
  }
}
