/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { PostDto } from "src/dtos/post.dto";


@Injectable() // service göre görür. controllera injecte edilebilir
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  getPosts(): Promise<AxiosResponse> {
    return this.httpService.axiosRef.get<PostDto[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
  }
}

// axios ile apidan veri çekmek için @nestjs/axios ve axios paketlerini yüklüyoruz. HttpModule de AppModule import ediyoruz.
