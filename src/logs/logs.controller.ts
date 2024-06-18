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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('logs')
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

  @Post('joke')
  async registerJokeLog(
    @Body() registerJokeLog: RegisterJokeLogDto,
    @Res() response: Response,
  ): Promise<Response<RegisterJokeLogDto, Record<string, any>>> {
    const register = await this.logsService.registerJokeLog(registerJokeLog);
    return response.status(HttpStatus.CREATED).send(register);
  }
}
