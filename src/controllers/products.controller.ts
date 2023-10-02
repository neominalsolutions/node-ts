/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { ProductService } from "src/services/product.service";
import { Response } from "express";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "src/entities/product.entity";
import {
  ProductCreateDto,
  ProductReadDto,
  ProductUpdateDto,
} from "src/dtos/product.dto";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

@Controller("api/products")
@ApiTags("products")
export class ProductsController {
  constructor(
    private productService: ProductService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  // HTTPGET işlemlerinde swagger doğru tipleri api dokumentasyonunda dışarı çıkarabilmek ApiReponse tipinde bir çıktı iser. bunu post put gibi işlemlerde uygulamamıza gerek kalmaz. @body anatasyonu swagger'ın ilgili şemayı default olarak dışarı çıkarmasını sağlar.

  @ApiResponse({ type: ProductReadDto, description: "Ürünler" })
  @Get()
  async products(): Promise<ProductReadDto[]> {
    const plist = await this.productService.findAll();

    const plistDto = this.mapper.mapArray(plist, Product, ProductReadDto);

    return plistDto;
  }

  // api/products/1
  @Get(":id")
  async productsById(
    @Param("id", ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    // return res.status(200).json(this.productService.findById(id));
    console.log("aa", id);
    const response = await this.productService.findById(id);

    // @Res() anatasyonu kullanırsak res express vari dönmemiz lazım return ifadesi promise olarak çözülmüyor istek kitli kalıyor. resorve olmuyor. Dikkat
    res.status(HttpStatus.OK).json(response); // expressdeki dönüş tipinin aynısı
    // return response;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() product: ProductCreateDto) {
    // var p = new Product();
    // p.price = product.price;
    // p.name = product.name;
    // p.stock = product.stock;

    const p = this.mapper.map(product, ProductCreateDto, Product);

    await this.productService.create(p);
  }

  @Put(":id")
  @HttpCode(204)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() product: ProductUpdateDto
  ) {
    const entity = await this.productService.findById(id);

    if (entity == null) {
      throw new NotFoundException(); // 404 status code döner
    } else {
      const p = this.mapper.map(product, ProductUpdateDto, Product);
      await this.productService.update(p);
    }
  }

  @Delete(":id")
  @HttpCode(204)
  async delete(@Param("id", ParseIntPipe) id: number) {
    await this.productService.delete(id);
  }
}
