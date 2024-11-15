import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './user/user.entity';
import { Playlist } from './playlist/playlist.entity';
import { PlayListController } from './playlist/playlist.controller';
import { PlayListModule } from './playlist/playlists.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstant } from './common/constants/authConstant';
import { ArtistsModule } from './artists/artists.module';
import { dataSourceOptions } from '../db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';


const devPORT = { port : 3000 }
const prodPORT = { port: 4000 } 


@Module({
  imports: [
    ConfigModule.forRoot(
      {envFilePath:['.development.env','.production.env'],
        isGlobal:true
      }),
    TypeOrmModule.forRoot(dataSourceOptions),
      SongsModule,
      PlayListModule,
      UserModule,
      AuthModule,
      ArtistsModule,
      JwtModule.register({ 
        secret:authConstant.secret,
        signOptions:{
          expiresIn:'1d',
        }
      }),
      SeedModule,
      ConfigModule
    ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService
    },
    {
      provide:'CONFIG',
      useFactory: ()=>{
        return process.env.NODE_ENV === 'development'? devPORT:prodPORT;
      }
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource){
    console.log("Connection succesful Database_Name: " + dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer){
    //Option1  consumer.apply(LoggerMiddleware).forRoutes(`songs`);
    //Option2  consumer.apply(LoggerMiddleware).forRoutes({ path:`songs`, method:RequestMethod.POST})
    consumer.apply(LoggerMiddleware).forRoutes(SongsController)
  }
}
