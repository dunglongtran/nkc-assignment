import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostEntity, AuthorEntity} from '@mono/entities';

@Module({
    imports: [TypeOrmModule.forRoot({
        url: 'postgres://azkjueioegsdkz:ae51904d90f54862de598e9173dc3add8fbfdaa59bcabb87a86a40b963ed81d2@ec2-52-44-166-58.compute-1.amazonaws.com:5432/dcj6facpi0sfvh',
        type: 'postgres',
        host: 'ec2-52-44-166-58.compute-1.amazonaws.com',
        username: 'azkjueioegsdkz',
        password: 'ae51904d90f54862de598e9173dc3add8fbfdaa59bcabb87a86a40b963ed81d2',
        database: 'dcj6facpi0sfvh',
        port: 5432,
        entities: [PostEntity, AuthorEntity],
        synchronize: true,
        ssl: {
            rejectUnauthorized: false,
        },
    })],
})
export class ModuleDatabaseModule {
}
