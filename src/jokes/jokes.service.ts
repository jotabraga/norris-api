import { Injectable } from '@nestjs/common';
import { ChuckNorrisService } from '@/chuck-norris/chuck-norris.service';

@Injectable()
export class JokesService {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}

  async getJoke(): Promise<string> {
    return this.chuckNorrisService.getChuckNorrisApi();
  }
}
