import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlist/playlist.entity";
import { Song } from "src/songs/song.entity";
import { User } from "src/user/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'DB_Setup_2024!@',
    database: 'spotify_clone',
    entities: ['dist/**/*.entity.js'],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js'],
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource