import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesModule } from './jokes/jokes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, JokesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
