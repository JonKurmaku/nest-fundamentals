import { Playlist } from "src/playlist/playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn } from "typeorm";

@Entity('artists')
export class Artist {
 
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('varchar')
  name: string;

  @OneToOne(()=>User)
  @JoinColumn()
  user:User

  @ManyToMany(()=> Song, (song)=>song.artists)
  @JoinTable({ name:'songs_artist' })
  songs: Song[] 
  
  @ManyToOne(()=> Playlist, (playList)=>playList.songs)
  playList: Playlist  
}
