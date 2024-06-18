import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LogEntry, LogsService } from './logs.service';
import { GetJokeLogsDto } from './dto/get-joke-logs.dto';
import { RegisterJokeLogDto } from './dto/register-joke-log.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('jokes')
  async getJokesLogs(
    @Query() getJokeLogs: GetJokeLogsDto,
    @Res() response: Response,
  ): Promise<Response<LogEntry[], Record<string, any>>> {
    const { endDate, startDate } = getJokeLogs;
    const jokes = await this.logsService.readLogs(startDate, endDate);
    return response.status(HttpStatus.OK).send(jokes);
  }

  @Post('log')
  async registerJokeLog(
    @Body() registerJokeLog: RegisterJokeLogDto,
    @Res() response: Response,
  ): Promise<Response<any, Record<string, any>>> {
    await this.logsService.registerJokeLog(registerJokeLog);
    return response.status(HttpStatus.CREATED);
  }
}
