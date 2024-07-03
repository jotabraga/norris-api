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
import { TypeOrmModule } from '@nestjs/typeorm';

const prodEnvironment = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NORRIS_API_URL: Joi.required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: prodEnvironment ? false : true,
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
  exports: ['LOG_FILE_PATH'],
})
export class AppModule {}
