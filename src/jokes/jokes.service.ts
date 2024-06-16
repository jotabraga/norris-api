import { Injectable, NotFoundException } from '@nestjs/common';
import { ChuckNorrisService } from '@/chuck-norris/chuck-norris.service';
import { GetKeywordJokeDto } from './dto/get-keyword-joke.dto';

@Injectable()
export class JokesService {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}

  async getRandomJoke(): Promise<string> {
    const response = await this.chuckNorrisService
      .getChuckNorrisApi()
      .get('/jokes/random');
    const randomJoke = response?.data?.value;
    if (!randomJoke) throw new NotFoundException('Random joke not found');
    return randomJoke;
  }

  async getKeywordJoke(getKeywordDto: GetKeywordJokeDto): Promise<string> {
    const { keyword } = getKeywordDto;
    const params = {
      query: keyword,
    };
    const response = await this.chuckNorrisService
      .getChuckNorrisApi()
      .get('/jokes/search', { params });
    const [keywordJokeData] = response?.data?.result;
    const keywordJoke = keywordJokeData.value ?? null;
    if (!keywordJoke)
      throw new NotFoundException('There is no joke related to this keyword');
    return keywordJoke;
  }
}
