import { Injectable } from '@nestjs/common';
import { RegisterJokeLogDto } from './dto/register-joke-log.dto';
import * as fs from 'fs';
import * as path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import { CsvWriter } from 'csv-writer/src/lib/csv-writer';
import { ObjectMap } from 'csv-writer/src/lib/lang/object';
import * as csvParser from 'csv-parser';

interface LogEntry {
  Joke: string;
  Timestamp: string;
  'Query type': string;
  'Search term': string | null;
}

@Injectable()
export class LogsService {
  constructor(
    private logFilePath: string,
    private csvWriter: CsvWriter<ObjectMap<any>>,
  ) {
    this.logFilePath = path.resolve(process.cwd(), 'api-logs.csv');

    this.csvWriter = createObjectCsvWriter({
      path: this.logFilePath,
      header: [
        { id: 'result', title: 'Joke' },
        { id: 'queryType', title: 'Query type' },
        { id: 'timestamp', title: 'Timestamp' },
        { id: 'searchTerm', title: 'Search term' },
      ],
      append: true,
    });
  }

  async registerJokeLog(registerJokeLog: RegisterJokeLogDto): Promise<void> {
    const { queryType, result, searchTerm, timestamp } = registerJokeLog;
    const record = [{ result, queryType, timestamp, searchTerm }];
    await this.csvWriter.writeRecords([record]);
  }

  async readLogs(startDate: string, endDate: string): Promise<LogEntry[]> {
    const logs: LogEntry[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(this.logFilePath)
        .pipe(csvParser())
        .on('data', (data: LogEntry) => {
          const logDate = new Date(data['Timestamp']);
          if (logDate >= new Date(startDate) && logDate <= new Date(endDate)) {
            logs.push(data);
          }
        })
        .on('end', () => {
          resolve(logs);
        })
        .on('error', (error: any) => {
          reject(error);
        });
    });
  }
}
