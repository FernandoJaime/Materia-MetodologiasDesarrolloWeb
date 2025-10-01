import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsBoolean,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class ShoppingProductDto {
  @IsString({ message: "El ID del producto debe ser un texto" })
  @IsNotEmpty({ message: "El ID del producto es obligatorio" })
  productId!: string;

  @IsNumber({}, { message: "La cantidad debe ser un número" })
  @Min(1, { message: "La cantidad mínima es 1" })
  amount!: number;
}

export class CreateShoppingDto {
  @IsString({ message: "La descripción debe ser un texto" })
  @IsOptional()
  description?: string;

  @IsString({ message: "El documento debe ser un texto" })
  @IsOptional()
  document?: string;

  @IsString({ message: "El cliente debe ser un texto" })
  @IsNotEmpty({ message: "El cliente es obligatorio" })
  client!: string;

  @IsBoolean({ message: "El campo pagado debe ser un valor booleano" })
  @IsOptional()
  pagado?: boolean;

  @IsArray({ message: "Los productos deben ser un arreglo" })
  @ValidateNested({ each: true })
  @Type(() => ShoppingProductDto)
  @IsNotEmpty({ message: "Debe incluir al menos un producto en la compra" })
  products!: ShoppingProductDto[];
}