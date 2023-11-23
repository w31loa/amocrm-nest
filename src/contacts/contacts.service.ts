import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { CONTACTS_URL, GET_CONTACTS_URL, LEADS_URL } from './contacts.constans';
import { ContactDto } from './dto/contact.dto';
import { IContact } from './contacts.interface';

@Injectable()
export class ContactsService {
    contact:IContact

    
    constructor(private readonly authService:AuthService,
                private readonly httpService:HttpService){}

                

    async getContactByIdOrEmail(dto:ContactDto):Promise<IContact>|null{  // проверяем существующие контакты

        const headers={
            'Authorization': `Bearer ${this.authService.access_token}`
        }

        let response = ((await firstValueFrom(this.httpService.get(GET_CONTACTS_URL+dto.email, {headers})))).data
        if(!response){
            response = ((await firstValueFrom(this.httpService.get(GET_CONTACTS_URL+dto.phone, {headers})))).data
        }
        if(response){
            const contact:IContact =response._embedded.contacts
            this.contact = contact
            this.updateContact(dto)
            return this.contact
        }
        return null
        
    }

    async createContact(dto:ContactDto){ // функция создания нового контакта
        const headers={
            'Authorization': `Bearer ${this.authService.access_token}`
        }

        const data = [
            {
                "name": dto.name,
                "first_name": dto.name,
                "custom_fields_values": [
                    {
                        "field_id": 1514165,
                        "field_name": "Email",
                        "field_code": "EMAIL",
                        "field_type": "multitext",
                        "values": [
                            {
                                "value": dto.email,
                                "enum_id": 925921,
                                "enum_code": "WORK"
                            }
                        ]
                    },
                    {
                        "field_id": 1514163,
                        "field_name": "Телефон",
                        "field_code": "PHONE",
                        "field_type": "multitext",
                        "values": [
                            {
                                "value": dto.phone,
                                "enum_id": 925909,
                                "enum_code": "WORK"
                            }
                        ]
                    }
                ]
            }
        ]
            
        
      
            const response = ((await firstValueFrom(this.httpService.post(CONTACTS_URL, data, {headers})))).data
            this.contact = response._embedded.contacts
            return this.contact
       
  
    }

    private async updateContact(dto:ContactDto){ //обновление уже существующих контактов        

        const headers={
            'Authorization': `Bearer ${this.authService.access_token}`
        }

        const data ={
            "id": this.contact[0].id,
            "first_name": dto.name,
            "last_name": '',
            "custom_fields_values": [
                      {
                          "field_id": 1514165,
                          "field_name": "Email",
                          "field_code": "EMAIL",
                          "field_type": "multitext",
                          "values": [
                              {
                                  "value": dto.email,
                                  "enum_id": 925921,
                                  "enum_code": "WORK"
                              }
                          ]
                      },
                      {
                          "field_id": 1514163,
                          "field_name": "Телефон",
                          "field_code": "PHONE",
                          "field_type": "multitext",
                          "values": [
                              {
                                  "value": dto.phone,
                                  "enum_id": 925909,
                                  "enum_code": "WORK"
                              }
                          ]
                      }
                  ]
          }
        const   response = ((await firstValueFrom(this.httpService.patch(CONTACTS_URL+"/"+this.contact[0].id, data , {headers})))).data
        return response
    }

    async createDealByContactId(id:number){ // созздание сделки
        const headers={
            'Authorization': `Bearer ${this.authService.access_token}`
        }

        const data = [
            {
                "name": "Тестовая сделка",
                  "_embedded": {
                    "contacts": [
                        {
                            "id": id
                        }
                    ]
                }
            }
        ]
        const response = ((await firstValueFrom(this.httpService.post(LEADS_URL, data, {headers})))).data
        return response
    }


 
}
