import { Module, forwardRef } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { AppModule } from '@/app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
