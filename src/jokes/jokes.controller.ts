import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { Response } from 'express';
import { GetKeywordJokeDto } from './dto/get-keyword-joke.dto';

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
    @Query() getKeywordJoke: GetKeywordJokeDto,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const joke = await this.jokesService.getKeywordJoke(getKeywordJoke);
    return response.status(HttpStatus.OK).send(joke);
  }
}
