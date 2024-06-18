import { Injectable } from '@nestjs/common';
import { RegisterJokeLogDto } from './dto/register-joke-log.dto';
import * as fs from 'fs';
import * as path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import * as csvParser from 'csv-parser';

export interface LogEntry {
  Joke: string;
  'Query type': string;
  Timestamp: string;
  'Search term': string | null;
}

@Injectable()
export class LogsService {
  private logFilePath: string;
  private csvWriter: any;
  constructor() {
    this.logFilePath = path.resolve(process.cwd(), 'api-logs.csv');

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

  async registerJokeLog(registerJokeLog: RegisterJokeLogDto): Promise<void> {
    const { queryType, result, searchTerm, timestamp } = registerJokeLog;
    const record = {
      Joke: result,
      'Query type': queryType,
      Timestamp: timestamp,
      'Search term': searchTerm || '',
    };
    await this.csvWriter.writeRecords([record]);
  }

  async readLogs(startDate?: string, endDate?: string): Promise<LogEntry[]> {
    const logs: LogEntry[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(this.logFilePath)
        .pipe(csvParser())
        .on('data', (data: LogEntry) => {
          const logDate = new Date(data['Timestamp']);
          if (
            (!startDate || logDate >= new Date(startDate)) &&
            (!endDate || logDate <= new Date(endDate))
          ) {
            logs.push(data);
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
