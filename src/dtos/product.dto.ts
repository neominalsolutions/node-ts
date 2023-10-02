import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Max, Min } from "class-validator";

export class ProductCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: "name boş geçilemez" })
  @AutoMap()
  name: string;
  @ApiProperty()
  @Min(1, { message: "en az 1 girilebilir" })
  @AutoMap()
  price: number;
  @ApiProperty({ default: 10, description: "stok miktarı" })
  @Max(100, { message: "en fazla 100 seçilebilir" })
  @AutoMap()
  stock: number;
}

// Req.Bodyden bir değer alırken ApiProperty anatasyonu önemlidir.
export class ProductUpdateDto {
  @ApiProperty() // swagger tarafında request body olarak algılanması
  @AutoMap() // entity to dto map işlemi için
  name: string;
  @ApiProperty()
  @AutoMap()
  price: number;
}

export class ProductStockChangeDto {
  name: string;
  price: number;
}

export class ProductReadDto {
  @AutoMap()
  name: string;
  @AutoMap()
  price: number;
}
