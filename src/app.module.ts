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


const devPORT = { port : 3000 }
const prodPORT = { port: 4000 } 


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'DB_Setup_2024!@',
      database: 'spotify_clone',
     entities: [
      Song,
      Artist,
      User,
      Playlist,
     ],
      synchronize: true,
      }),
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
      ArtistsModule,
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
