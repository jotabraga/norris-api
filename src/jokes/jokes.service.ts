import { Injectable } from '@nestjs/common';
import { ChuckNorrisService } from '@/chuck-norris/chuck-norris.service';

@Injectable()
export class JokesService {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}

  async getRandomJoke(): Promise<string> {
    const api = this.chuckNorrisService.getChuckNorrisApi();
    return 'api';
  }

  async searchForJoke(keyWord: string): Promise<string> {
    const api = this.chuckNorrisService.getChuckNorrisApi();
    return keyWord;
  }
}
