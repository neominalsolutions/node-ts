import { TestModule } from './test.module';
import { ProductsController } from "./controllers/products.controller";
import { ProductService } from "./services/product.service";
import { PostsService } from "./services/posts.service";
import { PostsController } from "./controllers/posts.controller";
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./controllers/app.controller";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductMapperProfile } from "./mappings/product.mapper";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";

@Module({
  imports: [
        TestModule, 
    HttpModule,
    AutomapperModule.forRoot({
      // uygulama için dtoları hepsini bul ve entityler maplemeyi aktif et
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      port: 5432,
      host: "localhost",
      database: "NestJSDB",
      username: "postgres",
      password: "admin",
      entities: [Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]), // Repository bağlantıları için module olarak entityleri dışarı çıkardık
  ], // başka bir module Ana root module import edip kullanmak için
  controllers: [ProductsController, PostsController, AppController], // ilgili moduledeki controller tanıtmak
  providers: [ProductService, PostsService, AppService, ProductMapperProfile], // service tanımı, guard, interceptor, service, pipes gibi tanımlamalar servis özelliği gösteri buraya eklenir.
})
export class AppModule {}
