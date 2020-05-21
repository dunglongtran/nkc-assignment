import {Args, Mutation, Query, Resolver, Subscription, ResolveProperty} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express';
import {CreateAuthorInput, Author, UpdateAuthorInput} from './author.type';
import {Inject} from '@nestjs/common';
import {AuthorService} from './author.service';
import {FieldResolver, Root} from 'type-graphql';
import {Post, UpdatePostInput} from '@mono/module-post/src/post.type';

const pubSub = new PubSub();

@Resolver(of => Author)
export class AuthorResolver {

  constructor(private readonly service: AuthorService) {
  }

  @Query(returns => [Author])
  async getAuthors(): Promise<Author[]> {
    const authors = await this.service.getAuthors();
    return authors;
  }

  @Mutation(returns => Author)
  async createAuthor(@Args('input') args: CreateAuthorInput): Promise<Author> {
    const author = await this.service.createAuthor(args);
    pubSub.publish('createdAuthor', {createdAuthor: author});
    return author;
  }
  @Query(returns => Author)
  async getAuthor(@Args('id')id: string): Promise<Author> {
    const author = await this.service.getAuthor(id);
    return author;
  }
  @Subscription(returns => Author)
  async createdAuthor() {

    return pubSub.asyncIterator('createdAuthor');
  }
  @Mutation(returns => Author)
  async updateAuthor(@Args('input') args: UpdateAuthorInput): Promise<Author> {

    return await this.service.updateAuthor(args);
  }

  @Mutation(returnds => Boolean)
  async deleteAuthor(@Args('id') id: string): Promise<boolean> {
    try {
      await this.service.deleteAuthor(id);
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }
  @ResolveProperty()
  async posts(@Root() author: Author) {
    return this.service.findPostsByAuthor(author);
  }

}
