import { Inject, Injectable } from '@nestjs/common';
import { RegisterJokeLogDto } from './dto/register-joke-log.dto';
import * as fs from 'fs';
import * as path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import * as csvParser from 'csv-parser';
import { CsvJokeLogsDto } from './dto/csv-joke-logs.dto';
import { parseISO, format } from 'date-fns';

@Injectable()
export class LogsService {
  private csvWriter: any;
  constructor(
    @Inject('LOG_FILE_PATH')
    private readonly logFilePath: string = path.resolve(
      process.cwd(),
      'api-logs.csv',
    ),
  ) {
    this.csvWriter = createObjectCsvWriter({
      path: this.logFilePath,
      header: [
        { id: 'Joke', title: 'Joke' },
        { id: 'Query type', title: 'Query type' },
        { id: 'Timestamp', title: 'Timestamp' },
        { id: 'Search term', title: 'Search term' },
      ],
      append:
        fs.existsSync(this.logFilePath) &&
        fs.statSync(this.logFilePath).size > 0,
    });
  }

  async registerJokeLog(registerJokeLog: RegisterJokeLogDto): Promise<string> {
    const { queryType, result, searchTerm, timestamp } = registerJokeLog;
    const record = {
      Joke: result,
      'Query type': queryType,
      Timestamp: timestamp,
      'Search term': searchTerm || '',
    };
    await this.csvWriter.writeRecords([record]);
    return `The joke has been registered at ${timestamp} successfully!`;
  }

  async readLogs(
    startDate?: string,
    endDate?: string,
  ): Promise<CsvJokeLogsDto[]> {
    const logs: CsvJokeLogsDto[] = [];

    // Parse start and end dates
    const start = startDate ? parseISO(startDate) : null;
    const end = endDate ? parseISO(endDate) : null;

    return new Promise((resolve, reject) => {
      fs.createReadStream(this.logFilePath)
        .pipe(csvParser())
        .on('data', (data: CsvJokeLogsDto) => {
          try {
            if (data && data['Timestamp']) {
              const logDate = parseISO(data['Timestamp']);

              const logDateFormatted = format(logDate, 'yyyy-MM-dd');

              if (start && end) {
                const startDateFormatted = format(start, 'yyyy-MM-dd');
                const endDateFormatted = format(end, 'yyyy-MM-dd');

                if (
                  logDateFormatted >= startDateFormatted &&
                  logDateFormatted <= endDateFormatted
                ) {
                  logs.push(data);
                }
              } else if (start && !end) {
                const startDateFormatted = format(start, 'yyyy-MM-dd');

                if (logDateFormatted >= startDateFormatted) {
                  logs.push(data);
                }
              } else if (!start && end) {
                const endDateFormatted = format(end, 'yyyy-MM-dd');

                if (logDateFormatted <= endDateFormatted) {
                  logs.push(data);
                }
              } else {
                logs.push(data);
              }
            }
          } catch (error) {
            console.error('Error processing log data:', error);
          }
        })
        .on('end', () => {
          resolve(logs);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
