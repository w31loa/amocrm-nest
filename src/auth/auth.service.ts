import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ACCESS_TOKEN_URL } from './auth.constants';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {

    authCode:string
    access_token:string
    refresh_token:string

    constructor(private readonly configService:ConfigService,
                private readonly httpService:HttpService){}

    setAuthCode(code){
        this.authCode = code
        return code
    }

     async getTokens(){
        const data = {
            "client_id": this.configService.get('CLIENT_ID'),
            "client_secret": this.configService.get('CLIENT_SECRET'),
            "grant_type": "authorization_code",
            "code": this.authCode, 
            "redirect_uri":this.configService.get('REDIRECT_URI')
        }
        try{
            const tokens = await firstValueFrom(this.httpService.post(ACCESS_TOKEN_URL, data)) 
            this.access_token = tokens.data.access_token
            this.refresh_token = tokens.data.refresh_token
        }
        catch(e){
            throw new Error(e) 
        }
        
       

        console.log({ac: this.access_token, re: this.refresh_token})
    }



   
}
