import { AuthService } from './auth.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Get('') // получение кода авторизации из ngrok
    getCode(@Query('code') code : string){
        this.authService.setAuthCode(code)
        return  this.authService.getTokens()
    }


}
