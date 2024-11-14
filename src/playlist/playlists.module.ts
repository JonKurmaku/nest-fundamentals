import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/user/user.entity";
import { PlayListController } from './playlist.controller';
import { PlayListService } from './playlist.service';





@Module({
    imports : [TypeOrmModule.forFeature([Playlist, Song, User])],
    controllers: [PlayListController],
    providers: [PlayListService]
})
export class PlayListModule {}