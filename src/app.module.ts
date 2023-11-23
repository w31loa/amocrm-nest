import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [AuthModule, ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
