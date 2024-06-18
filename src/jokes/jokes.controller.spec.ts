import { Test, TestingModule } from '@nestjs/testing';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { Response } from 'express';

describe('JokesController', () => {
  let controller: JokesController;
  let jokesService: JokesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JokesController],
      providers: [
        {
          provide: JokesService,
          useValue: {
            getRandomJoke: jest.fn(),
            getKeywordJoke: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JokesController>(JokesController);
    jokesService = module.get<JokesService>(JokesService);
  });

  describe('getRandomJoke', () => {
    it('should return a random joke', async () => {
      const mockJoke = 'Mocked random joke';

      (jokesService.getRandomJoke as jest.Mock).mockResolvedValue(mockJoke);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.getRandomJoke(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(mockJoke);
    });
  });

  describe('getSpecificJoke', () => {
    it('should return a joke based on keyword', async () => {
      const mockKeyword = { keyword: 'Chuck Norris' };
      const mockJoke = 'Mocked Chuck Norris joke';

      (jokesService.getKeywordJoke as jest.Mock).mockResolvedValue(mockJoke);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.getSpecificJoke(mockKeyword, mockResponse);

      expect(jokesService.getKeywordJoke).toHaveBeenCalledWith(mockKeyword);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith(mockJoke);
    });
  });
});
