import { Controller, Get, Query } from '@nestjs/common';
import { JokesService } from './jokes.service';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get()
  async getRandomJoke(): Promise<string> {
    return await this.jokesService.getJoke();
  }
}
