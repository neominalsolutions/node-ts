/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}

  async create(entity: Product) {
    await this.productRepo.save(entity);
  }

  async update(entity: Product) {
    await this.productRepo.update({ id: entity.id }, entity);
  }

  async delete(id: number) {
    await this.productRepo.delete({ id });
  }

  async findById(id: number) {
    console.log("id", typeof id);
    const response = await this.productRepo.findOne({ where: { id: id } });
    console.log("response", response);

    return response;
  }

  async findByName(name: string) {
    return await this.productRepo.findOneBy({ name });
  }

  async findAll() {
    return await this.productRepo.find();
  }

  // {where:{name.equals('a')}}
  async findWhere(criteria: any) {
    return await this.productRepo.find(criteria);
  }
}
