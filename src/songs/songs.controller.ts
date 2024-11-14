import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Injectable, Param, ParseIntPipe, Post, Put, Query, Req, Request, Scope, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { SourceMapping } from 'module';
import { DeleteResult, UpdateDescription, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {

constructor(private songService: SongsService,
            @Inject('CONNECTION') 
            private connection:Connection,
){
   // console.log(this.connection)
}

@Get()
findAll(
  @Query('page',new DefaultValuePipe(1),ParseIntPipe) page:number = 1,
  @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit:number = 10,  
): Promise<Pagination<Song>>{
    try{
    
        limit = limit > 100 ? 100 : limit
        return this.songService.paginate({page,limit})
    }catch(e){
     throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
            cause: e
        }
     )
    }
    

}

@Get(`:id`)
findOneByID(@Param(`id`, new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number ): Promise<Song>{
    return this.songService.findOneByID(id)
}

@Post()
@UseGuards(JwtAuthGuard)
create(@Body() createSongDTO : CreateSongDTO,
       @Request() req): Promise<Song>{
    console.log(req.user)
    return this.songService.create(createSongDTO);
}

@Delete(`:id`)
deleteSong(@Param(`id`,ParseIntPipe) id:number ): Promise<DeleteResult>{
    return this.songService.remove(id)
}

@Put(`:id`)
updateSong(@Param(`id`, new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number, 
           @Body() updateSongDTO : UpdateSongDTO): Promise<UpdateResult> {
    
    return this.songService.update(id,updateSongDTO)
}
}
