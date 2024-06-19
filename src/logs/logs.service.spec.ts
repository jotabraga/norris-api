import { Test, TestingModule } from '@nestjs/testing';
import { LogsService } from './logs.service';
import * as path from 'path';
import * as mockFs from 'mock-fs';

describe('LogsService', () => {
  let logsService: LogsService;
  const testLogFilePath = path.resolve(process.cwd(), 'test-api-logs.csv');

  beforeEach(async () => {
    // Reset mock file system before each test
    mockFs({
      [testLogFilePath]: `Joke,Query type,Timestamp,Search term
        "Joke 1","query","2023-01-01T12:00:00Z","funny"
        "Joke 2","query","2023-01-02T12:00:00Z","hilarious"
        "Joke 3","query","2023-01-03T12:00:00Z","humor"
      `,
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: 'LOG_FILE_PATH',
          useValue: testLogFilePath,
        },
      ],
    }).compile();

    logsService = module.get<LogsService>(LogsService);
  });

  afterEach(() => {
    // Restore mock file system after each test
    mockFs.restore();
  });

  describe('registerJokeLog', () => {
    it('should register a joke log if the params are correct', async () => {
      const mockJokeData = {
        queryType: 'random',
        result: 'Chuck norris bit a horse',
        searchTerm: 'horse',
        timestamp: '2024-06-19T00:39:05.672Z',
      };

      const joke = await logsService.registerJokeLog(mockJokeData);

      expect(joke).toEqual(
        'The joke has been registered at 2024-06-19T00:39:05.672Z successfully!',
      );
    });
  });

  describe('readLogs', () => {
    it('should read and return the joke logs in the csv file', async () => {
      const mockJokeData = {
        queryType: 'random',
        result: 'Chuck norris bit a horse',
        searchTerm: 'horse',
        timestamp: '2024-06-19T00:39:05.672Z',
      };

      const joke = await logsService.registerJokeLog(mockJokeData);

      expect(joke).toEqual(
        'The joke has been registered at 2024-06-19T00:39:05.672Z successfully!',
      );
    });

    it('should read logs within date range', async () => {
      const startDate = '2023-01-01T13:39:05.672Z';
      const endDate = '2023-01-02T13:39:05.672Z';

      const logs: any = await logsService.readLogs(startDate, endDate);

      expect(logs).toHaveLength(2);
    });

    it('should read all logs when no date range specified', async () => {
      const logs: any = await logsService.readLogs();

      expect(logs).toHaveLength(3);
    });
  });
});
