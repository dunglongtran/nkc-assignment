import {IPost} from "@mono/interfaces";
import {Author} from "./Author";

export abstract class Post implements IPost {

  id: number;
  title: string;
  content: string;
  author: Author;

}
