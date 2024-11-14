import { Body, Request, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from 'src/artists/types';
import { ValidateTokenDTO } from 'src/auth/dto/validate-token.dto'
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {

    constructor(private userService: UserService,
                private authService: AuthService){}

    @Post('signup')
    signup(@Body() userDTO: CreateUserDTO):Promise<User>{
        return this.userService.create(userDTO)
    }

    @Post('login')
    login(@Body() loginDTO:LoginDTO){
        return this.authService.login(loginDTO)
    }

    @Post('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2FA(@Request() req): Promise<Enable2FAType> {
        console.log(req.user)
        return this.authService.enable2FA(req.user.userId)
    }

    @Post('validate-2fa')
    @UseGuards(JwtAuthGuard)
    validate2FA(@Request() req,
                @Body() ValidateTokenDTO: ValidateTokenDTO):Promise<{ verified: boolean }>{
                    return this.authService.validate2FAToken(
                    req.user.userId,
                    ValidateTokenDTO.token
                    )
                    
    }

    @Get('disable-2fa')
    @UseGuards(JwtAuthGuard)
    disable2FA(@Request() req): Promise<UpdateResult>{
        return this.authService.disable2FA(req.user.userId)
    }

    @Get('profile')
    @UseGuards(AuthGuard('bearer'))
    getProfile(@Request() req){
        delete req.user.password
        return {
            msg:'authenticated with api key',
            user: req.user
        }
    }


}
