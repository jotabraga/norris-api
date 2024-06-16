import { Test, TestingModule } from '@nestjs/testing';
import { JokesService } from './jokes.service';
import { ChuckNorrisService } from '@/chuck-norris/chuck-norris.service';
import { NotFoundException } from '@nestjs/common';
import { GetKeywordJokeDto } from './dto/get-keyword-joke.dto';

describe('JokesService', () => {
  let jokesService: JokesService;
  let chuckNorrisService: ChuckNorrisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JokesService,
        {
          provide: ChuckNorrisService,
          useValue: {
            getChuckNorrisApi: jest.fn(() => ({
              get: jest.fn(),
            })),
          },
        },
      ],
    }).compile();

    jokesService = module.get<JokesService>(JokesService);
    chuckNorrisService = module.get<ChuckNorrisService>(ChuckNorrisService);
  });

  it('should be defined', () => {
    expect(jokesService).toBeDefined();
  });
});
