import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesModule } from './jokes/jokes.module';
import { ConfigModule } from '@nestjs/config';
import { ChuckNorrisModule } from '@/chuck-norris/chuck-norris.module';
import { CommonModule } from './common/common.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NORRIS_API_URL: Joi.required(),
      }),
    }),
    JokesModule,
    ChuckNorrisModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
