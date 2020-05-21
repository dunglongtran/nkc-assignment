import {Inject, Injectable} from '@nestjs/common';
import {AuthorRepository, PostRepository} from "@mono/repositories";
import {Author as AuthorModel} from "@mono/models"
import {InjectRepository} from '@nestjs/typeorm'
import {AuthorEntity, PostEntity} from "@mono/entities";
import {CreateAuthorInput, UpdateAuthorInput} from './author.type';
import {UpdatePostInput} from "@mono/module-post/src/post.type";

@Injectable()
export class AuthorService {

  constructor(
    @InjectRepository(AuthorEntity)
    private readonly repository: AuthorRepository,
    @InjectRepository(PostEntity)
    private readonly repositoryPost: PostRepository
  ) {
  }

  async getAuthors() {
    return this.repository.find();
  }
  async getAuthor(id: string) {
    return this.repository.findOne(id);
  }

  async deleteAuthor(id: string) {
    // @ts-ignore
    const entity = this.repository.findOne({id: id * 1},{});
    const deleted = await this.repository.remove(entity);
    console.log('deleteAuthor', id, deleted, entity);
    return deleted;
  }

  async updateAuthor(arg: UpdateAuthorInput) {
    const entity = await this.repository.findOne(arg.id);
    // @ts-ignore
    const preUpdate = {...entity, ...arg};
    const result = await this.repository.save(preUpdate);
    console.log('updateAuthor', arg, entity, preUpdate, result);
    return result;
  }
  async createAuthor(arg: CreateAuthorInput) {
    const author = this.repository.create(arg)
    return this.repository.save(author)
  }

  async findPostsByAuthor(author: AuthorModel) {
    return this.repositoryPost.find({relations: ['author'], where: {author: author}})
  }
}
