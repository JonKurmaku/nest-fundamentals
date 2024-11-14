import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable({
    scope: Scope.TRANSIENT, 
})
export class SongsService {
songsRepo: any;

constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
        ){}

private readonly songs = [];

//Endpoints - START

async create(songDTO: CreateSongDTO ): Promise<Song>{
    const song = new Song()

    song.title = songDTO.title
    song.artists = songDTO.artists
    song.duration = songDTO.duration
    song.lyrics = songDTO.lyrics
    song.releasedDate = songDTO.releasedDate

    const artists = await this.artistRepository.findByIds(songDTO.artists)
    song.artists = artists

    return this.songsRepository.save(song)
    
}

async findAll(): Promise<Song[]>{
    return this.songsRepository.find();
}

async findOneByID(id: number): Promise<Song>{
    return this.songsRepository.findOneBy({ id }) 
}

async remove(id: number): Promise<DeleteResult>{
    return this.songsRepository.delete(id)
}

async update(id:number,updatedSongDTO:UpdateSongDTO): Promise<UpdateResult>{
    return this.songsRepository.update(id,updatedSongDTO)    
}

//Endpoints - END

async paginate(options: IPaginationOptions): Promise<Pagination<Song>>{0

    const queryBuilder = this.songsRepository.createQueryBuilder('c')
    queryBuilder.orderBy('c.releasedDate','DESC')
    
    return paginate<Song>(queryBuilder,options)
}


}
