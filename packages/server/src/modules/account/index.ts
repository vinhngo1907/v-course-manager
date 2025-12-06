import { Global, Logger, Module } from '@nestjs/common';
import { AccountController } from './controller';
import { AccountsService } from './service';
import { DatabaseService } from '../database/service';

@Global()
@Module({
  providers: [DatabaseService, AccountsService, Logger],
  controllers: [AccountController],
  exports: [AccountsService],
})
export class AccountModule {}
