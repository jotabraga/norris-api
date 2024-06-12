import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesModule } from './modules/jokes/jokes.module';

@Module({
  imports: [JokesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
