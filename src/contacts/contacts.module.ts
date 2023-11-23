import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, HttpModule],
  providers: [ContactsService],
  controllers: [ContactsController]
})
export class ContactsModule {}
