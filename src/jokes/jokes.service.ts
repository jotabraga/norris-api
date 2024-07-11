import { Injectable, NotFoundException } from '@nestjs/common';
import { ChuckNorrisService } from '@/chuck-norris/chuck-norris.service';
import { GetKeywordJokeDto } from './dto/get-keyword-joke.dto';
import { LogsService } from '@/logs/logs.service';
import { RegisterJokeLogDto } from '@/logs/dto/register-joke-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Joke } from './entities/joke.entity';
import { Document, Model } from 'mongoose';
import { CreateJokeDto } from './dto/create-joke.dto';

@Injectable()
export class JokesService {
  constructor(
    private readonly chuckNorrisService: ChuckNorrisService,
    private readonly logsService: LogsService,
    @InjectModel(Joke.name) private readonly jokeModel: Model<Joke>,
  ) {}

  async getRandomJoke(): Promise<string> {
    const { data } = await this.chuckNorrisService
      .getChuckNorrisApi()
      .get('/jokes/random');
    const randomJoke = data?.value;

    if (!randomJoke) throw new NotFoundException('Random joke not found');

    const jokeData: RegisterJokeLogDto = {
      queryType: 'random',
      result: randomJoke,
      searchTerm: '',
      timestamp: new Date().toISOString(),
    };

    await this.logsService.registerJokeLog(jokeData);
    return randomJoke;
  }

  create(createJokeDto: CreateJokeDto): Promise<
    Document<unknown, object, Joke> &
      Joke &
      Required<{
        _id: unknown;
      }>
  > {
    const joke = new this.jokeModel(createJokeDto);
    return joke.save();
  }

  async getKeywordJoke(getKeyword: GetKeywordJokeDto): Promise<string> {
    const { keyword } = getKeyword;
    const params = {
      query: keyword,
    };
    const { data } = await this.chuckNorrisService
      .getChuckNorrisApi()
      .get('/jokes/search', { params });

    const [keywordJokeData] = data?.result;

    const keywordJoke = keywordJokeData?.value ?? null;

    if (!keywordJoke)
      throw new NotFoundException('There is no joke related to this keyword');

    const jokeData: RegisterJokeLogDto = {
      queryType: 'keyword',
      result: keywordJoke,
      searchTerm: keyword || '',
      timestamp: new Date().toISOString(),
    };

    await this.logsService.registerJokeLog(jokeData);

    return keywordJoke;
  }
}
