import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ContactDto } from './dto/contact.dto';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactService:ContactsService){}

    @Get(':name/:email/:phone')
    async findContactsAndCreateDeal(@Param() dto:ContactDto){
        const contact =await this.contactService.getContactByIdOrEmail(dto)  //проверяем существует ли контакт
        if(!contact){ // 
            const newContact =await this.contactService.createContact(dto) // если нет то создаем новый
            return this.contactService.createDealByContactId(newContact[0].id) 
        }
        return this.contactService.createDealByContactId(contact[0].id)  // создаем сделку
      
    }
}
