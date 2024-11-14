import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstant } from 'src/common/constants/authConstant';
import { JwtStrategy } from './strategy/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { ArtistsModule } from 'src/artists/artists.module';
import { ApiKeyStrategy } from './strategy/api-key-strategy';

@Module({
  imports:[UserModule,
    JwtModule.register({ 
    secret:authConstant.secret,
    signOptions:{
      expiresIn:'1d',
    },}),
    PassportModule,
    ArtistsModule],
  providers: [AuthService,JwtStrategy,ApiKeyStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
