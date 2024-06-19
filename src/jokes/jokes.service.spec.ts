import { Test, TestingModule } from '@nestjs/testing';
import { JokesService } from './jokes.service';
import { ChuckNorrisService } from '@/chuck-norris/chuck-norris.service';
import { LogsService } from '@/logs/logs.service';
import { NotFoundException } from '@nestjs/common';

describe('JokesService', () => {
  let jokesService: JokesService;
  let chuckNorrisService: ChuckNorrisService;
  const chuckNorrisMock = {
    getChuckNorrisApi: jest.fn().mockReturnValue({
      get: (): { data: string } => ({ data: 'mocked data' }),
    }),
  };

  // mock duplicado
  const logsServiceMock = {
    registerJokeLog: jest.fn(),
    readLogs: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: LogsService, useValue: logsServiceMock },
        { provide: ChuckNorrisService, useValue: chuckNorrisMock },
        JokesService,
      ],
    }).compile();

    jokesService = module.get<JokesService>(JokesService);
    chuckNorrisService = module.get<ChuckNorrisService>(ChuckNorrisService);
  });

  describe('getRandomJoke', () => {
    it('should fetch a random joke', async () => {
      const mockRandomJoke = { data: { value: 'Piada aleatória' } };

      jest
        .spyOn(chuckNorrisService.getChuckNorrisApi(), 'get')
        .mockResolvedValue(mockRandomJoke);

      const joke = await jokesService.getRandomJoke();

      expect(joke).toEqual('Piada aleatória');
    });

    it('should throw NotFoundException when no random joke is found', async () => {
      jest
        .spyOn(chuckNorrisService.getChuckNorrisApi(), 'get')
        .mockResolvedValue({});

      await expect(jokesService.getRandomJoke()).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getKeywordJoke', () => {
    it('should fetch a specific joke', async () => {
      const mockRandomJoke = {
        data: {
          result: [{ value: 'Piada específica' }, { value: 'Piada dois' }],
        },
      };

      jest
        .spyOn(chuckNorrisService.getChuckNorrisApi(), 'get')
        .mockResolvedValue(mockRandomJoke);

      const joke = await jokesService.getKeywordJoke({ keyword: 'pato' });

      expect(joke).toEqual('Piada específica');
    });

    it('should throw NotFoundException when no joke is found', async () => {
      const mockRandomJoke = {
        data: { result: [] },
      } as { data: { result: [] } };

      jest
        .spyOn(chuckNorrisService.getChuckNorrisApi(), 'get')
        .mockResolvedValue(mockRandomJoke);

      await expect(
        jokesService.getKeywordJoke({ keyword: 'pato' }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
