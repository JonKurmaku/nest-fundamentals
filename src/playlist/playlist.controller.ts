import { Body, Controller, Post } from '@nestjs/common';
import { PlayListService } from './playlist.service';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';

@Controller('playlist')
export class PlayListController {
    constructor(private playListService: PlayListService){}

    @Post()
    create(@Body() playlistDTO: CreatePlayListDto): Promise<Playlist>{
        return this.playListService.create(playlistDTO)
    }

}
