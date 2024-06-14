import { Module } from '@nestjs/common';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { ChuckNorrisModule } from 'src/chuck-norris/chuck-norris.module';

@Module({
  controllers: [JokesController],
  providers: [JokesService],
  imports: [ChuckNorrisModule],
})
export class JokesModule {}
