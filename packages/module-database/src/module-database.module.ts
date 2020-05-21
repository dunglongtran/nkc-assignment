import {Module, OnModuleInit} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostEntity, AuthorEntity} from '@mono/entities';

@Module({
    imports: [TypeOrmModule.forRoot({
        url: 'postgres://postgres:postgres@localhost:5432/postgres',
        type: 'postgres',
        host: 'localhost',
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        port: 5432,
        entities: [PostEntity, AuthorEntity],
        synchronize: true,
        // ssl: {
        //     rejectUnauthorized: false,
        //
        // },
    })],

})
export class ModuleDatabaseModule {

}
