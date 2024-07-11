import { Module } from '@nestjs/common';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { ChuckNorrisModule } from 'src/chuck-norris/chuck-norris.module';
import { LogsModule } from '@/logs/logs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Joke, JokeSchema } from './entities/joke.entity';
@Module({
  controllers: [JokesController],
  providers: [JokesService],
  imports: [
    ChuckNorrisModule,
    LogsModule,
    MongooseModule.forFeature([{ name: Joke.name, schema: JokeSchema }]),
  ],
})
export class JokesModule {}
