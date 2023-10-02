/*
https://docs.nestjs.com/controllers#controllers
*/

import { BadRequestException, Controller, Get, Res } from "@nestjs/common";
import { PostsService } from "src/services/posts.service";
import { Response } from "express";
import { PostDto } from "src/dtos/post.dto";

@Controller("posts") // controller route
export class PostsController {
  // post service controller içersinden bağlanma yöntemi DI
  constructor(private readonly postService: PostsService) {}

  @Get() // HttpGET anatasyonu
  getPosts(@Res() res: Response) {
    this.postService
      .getPosts()
      .then((response) => {
        // casting işlemi
        const posts = response.data as PostDto[];
        // tip bazlı çalışma imkanı sağladık.

        posts.map((item: PostDto) => {
          item.title = item.title.toUpperCase();
          return { ...item };
        });

        res.json(posts);
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
