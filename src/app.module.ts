import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesModule } from './jokes/jokes.module';
import { ConfigModule } from '@nestjs/config';
import { ChuckNorrisModule } from '@/chuck-norris/chuck-norris.module';

@Module({
  imports: [ConfigModule.forRoot(), JokesModule, ChuckNorrisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
