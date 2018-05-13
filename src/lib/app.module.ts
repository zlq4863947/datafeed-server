import { Module } from '@nestjs/common';
import { DatafeedController } from './datafeed.controller';
import { DatafeedService } from './datafeed.service';

@Module({
  controllers: [DatafeedController],
  components: [DatafeedService],
})
export class AppModule {}
