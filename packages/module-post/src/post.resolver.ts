import {Args, Mutation, Query, Resolver, Subscription, ResolveProperty} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express';
import {CreatePostInput, Post, UpdatePostInput} from './post.type'
import {Inject} from "@nestjs/common";
import {PostService} from "./post.service";
import {FieldResolver, Root} from "type-graphql";
import {Author} from "@mono/module-author";

const pubSub = new PubSub();

@Resolver(of => Post)
export class PostResolver {

    constructor(private readonly service: PostService) {
    }

    @Query(returns => [Post])
    async getPosts(): Promise<Post[]> {
        console.log(this.service.getPosts)
        const posts = await this.service.getPosts()
        return posts
    }

    @Query(returns => Post)
    async getPost(@Args('id')id: string): Promise<Post> {
        const post = await this.service.getPost(id)
        return post
    }

    @Mutation(returns => Post)
    async createPost(@Args('input') args: CreatePostInput): Promise<Post> {

        return this.service.createPost(args)
    }

    @Mutation(returns => Post)
    async updatePost(@Args('input') args: UpdatePostInput): Promise<Post> {

        return await this.service.updatePost(args);
    }

    @Mutation(returnds => Boolean)
    async deletePost(@Args('id') id: string): Promise<boolean> {
        try {
            await this.service.deletePost(id);
            return true;
        } catch (error) {
            console.error(error);
        }
        return false;
    }

    @ResolveProperty()
    author(@Root() post: Post) {
        return this.service.findAuthorByPost(post);
    }

}
