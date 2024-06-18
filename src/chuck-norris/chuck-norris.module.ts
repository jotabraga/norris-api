import { Module } from '@nestjs/common';
import { ChuckNorrisService } from './chuck-norris.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ChuckNorrisService],
  exports: [ChuckNorrisService],
})
export class ChuckNorrisModule {}
