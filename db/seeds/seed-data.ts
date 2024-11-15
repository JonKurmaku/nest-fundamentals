import { EntityManager } from "typeorm";
import { User } from "src/user/user.entity";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcryptjs"
import { v4 as uuid4 } from "uuid" 
import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlist/playlist.entity";


export const seedData = async (manager: EntityManager):Promise<void> =>{
    await seedUser()
    await seedArtist()
    await seedPlaylist()

    async function seedUser(){
        const salt = await bcrypt.genSalt()
        const encryptedPass = await bcrypt.hash('123456',salt)

        const user = new User()
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.email = faker.internet.email()
        user.password = encryptedPass
        user.apiKey = uuid4()

        await manager.getRepository(User).save(user)
    }
    
    
    async function seedArtist(){
        const salt = await bcrypt.genSalt()
        const encryptedPass = await bcrypt.hash('123456',salt)

        const user = new User()
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.email = faker.internet.email()
        user.password = encryptedPass
        user.apiKey = uuid4()

        const artist = new Artist()
        artist.user = user
        artist.name=faker.music.artist()

       // console.log(artist)
        await manager.getRepository(User).save(user)
        await manager.getRepository(Artist).save(artist)

    }
    
    
    async function seedPlaylist(){
        const salt = await bcrypt.genSalt()
        const encryptedPass = await bcrypt.hash('123456',salt)

        const user = new User()
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.email = faker.internet.email()
        user.password = encryptedPass
        user.apiKey = uuid4()

        const playList = new Playlist()
        playList.name = faker.music.genre()
        playList.user = user
      //  console.log(playList)

        await manager.getRepository(User).save(user)
        await manager.getRepository(Playlist).save(playList)
    }
 }


