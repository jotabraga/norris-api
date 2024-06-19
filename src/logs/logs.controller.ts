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
import { LogsService } from './logs.service';
import { GetJokeLogsDto } from './dto/get-joke-logs.dto';
import { RegisterJokeLogDto } from './dto/register-joke-log.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CsvJokeLogsDto } from './dto/csv-joke-logs.dto';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('jokes')
  @ApiResponse({
    status: 200,
    description: 'The joke has been successfully logged.',
    type: CsvJokeLogsDto,
    isArray: true,
  })
  async getJokesLogs(
    @Query() getJokeLogs: GetJokeLogsDto,
    @Res() response: Response,
  ): Promise<Response<CsvJokeLogsDto[], Record<string, any>>> {
    const { endDate, startDate } = getJokeLogs;
    const jokes = await this.logsService.readLogs(startDate, endDate);
    return response.status(HttpStatus.OK).send(jokes);
  }

  @Post('joke')
  @ApiResponse({
    status: 201,
    description: 'The joke has been successfully logged.',
    type: RegisterJokeLogDto,
  })
  async registerJokeLog(
    @Body() registerJokeLog: RegisterJokeLogDto,
    @Res() response: Response,
  ): Promise<Response<RegisterJokeLogDto, Record<string, any>>> {
    const register = await this.logsService.registerJokeLog(registerJokeLog);
    return response.status(HttpStatus.CREATED).send(register);
  }
}
