import { Module } from '@nestjs/common';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';
import { ChuckNorrisProviderModule } from 'src/chuck-norris-provider/chuck-norris-provider.module';

@Module({
  controllers: [JokesController],
  providers: [JokesService],
  imports: [ChuckNorrisProviderModule],
})
export class JokesModule {}
