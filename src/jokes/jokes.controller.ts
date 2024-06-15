import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Response } from 'express';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get('random-joke')
  async getRandomJoke(
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const joke = await this.jokesService.getRandomJoke();
    return response.status(HttpStatus.OK).send(joke);
  }

  @Get('search-joke')
  async getSpecificJoke(
    @Query() keyWord: string,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const joke = await this.jokesService.getRandomJoke();
    return response.status(HttpStatus.OK).send(joke);
  }
}
