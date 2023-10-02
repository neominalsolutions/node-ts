// Typeorm ile entity oluşturma
import { AutoMap } from "@automapper/classes";
import {
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity() // veri tabanı nesnesi oldu
export class Product {
  // @PrimaryColumn()
  // @Generated('increment')
  @PrimaryGeneratedColumn("increment")
  @AutoMap()
  id: number;

  // required nullable false
  @Column({ type: "varchar", length: 50, nullable: false })
  @AutoMap()
  name: string;

  @Column({ type: "decimal" })
  @AutoMap()
  price: number;

  @Column({ type: "int" })
  @AutoMap()
  stock: number;
}
