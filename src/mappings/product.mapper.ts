import { Mapper, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import {
  ProductCreateDto,
  ProductReadDto,
  ProductUpdateDto,
} from "src/dtos/product.dto";
import { Product } from "src/entities/product.entity";

@Injectable()
export class ProductMapperProfile extends AutomapperProfile {
  // @InjectMapper dependency injection
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, ProductCreateDto, Product); // source to destination
      createMap(mapper, Product, ProductReadDto);
      createMap(mapper, ProductUpdateDto, Product);
    };
  }
}
