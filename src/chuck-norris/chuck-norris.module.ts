import { Module } from '@nestjs/common';
import { ChuckNorrisService } from './chuck-norris.service';

@Module({
  providers: [ChuckNorrisService],
  exports: [ChuckNorrisService],
})
export class ChuckNorrisModule {}
