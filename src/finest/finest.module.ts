import { Module, HttpModule } from '@nestjs/common';
import { FinestController } from './controllers/finest/finest.controller';
import { IexService } from './services/iex/iex.service';
import { KeyService } from './services/iex/key.service';

@Module({
  imports: [HttpModule],
  controllers: [FinestController],
  providers: [IexService, KeyService],
})
export class FinestModule {}
