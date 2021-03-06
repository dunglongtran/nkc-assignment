import {Inject, Injectable} from '@nestjs/common';
import {AuthorRepository, PostRepository} from '@mono/repositories';
import {Post as PostModel} from '@mono/models';
import {InjectRepository} from '@nestjs/typeorm';
import {AuthorEntity, PostEntity} from '@mono/entities';
import {CreatePostInput, Post, UpdatePostInput} from './post.type';
import {detectBufferEncoding} from 'tslint/lib/utils';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly repository: PostRepository,
        @InjectRepository(AuthorEntity)
        private readonly repositoryAuthor: AuthorRepository,
    ) {
    }

    async getPosts() {
        return this.repository.find();
    }

    async getPost(id: string) {
        return this.repository.findOne(id);
    }

    async deletePost(id: string) {
        // @ts-ignore
        const entity = this.repository.create({id: id * 1});
        const deleted = await this.repository.remove(entity);
        console.log('deleted', id, deleted, entity);
        return deleted;
    }

    async updatePost(arg: UpdatePostInput) {
        const entity = await this.repository.findOne(arg.id);
        // @ts-ignore
        const preUpdate = {...entity, ...arg, id: arg.id * 1};
        const result = await this.repository.save(preUpdate as PostEntity);
        console.log('updatePost', arg, entity, preUpdate, result);
        return result;
    }

    async createPost(arg: CreatePostInput) {
        console.log('createPost', arg);
        const author = await this.repositoryAuthor.findOne(arg.authorId);
        const post = this.repository.create({...arg, author});
        console.log('createPost', post);
        return this.repository.save(post);
    }

    async findAuthorByPost(post: PostModel) {
        console.log('findAuthorByPost', post);
        const authorRelation = await this.repository.findOne(post.id * 1, {relations: ['author']});
        return authorRelation.author;
    }
}
