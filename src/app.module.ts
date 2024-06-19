import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesModule } from './jokes/jokes.module';
import { ConfigModule } from '@nestjs/config';
import { ChuckNorrisModule } from '@/chuck-norris/chuck-norris.module';
import { CommonModule } from './common/common.module';
import { LogsModule } from './logs/logs.module';
import * as Joi from '@hapi/joi';
import { LogsService } from './logs/logs.service';
import * as path from 'path';
import { ChuckNorrisService } from './chuck-norris/chuck-norris.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NORRIS_API_URL: Joi.required(),
      }),
    }),
    JokesModule,
    ChuckNorrisModule,
    CommonModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [
    ChuckNorrisService,
    AppService,
    LogsService,
    {
      provide: 'LOG_FILE_PATH',
      useValue: path.resolve(process.cwd(), 'api-logs.csv'),
    },
  ],
})
export class AppModule {}
