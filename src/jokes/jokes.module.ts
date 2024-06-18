import { Module } from '@nestjs/common';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { ChuckNorrisModule } from 'src/chuck-norris/chuck-norris.module';
import { LogsModule } from '@/logs/logs.module';

@Module({
  controllers: [JokesController],
  providers: [JokesService],
  imports: [ChuckNorrisModule, LogsModule],
})
export class JokesModule {}
