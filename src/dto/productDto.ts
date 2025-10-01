import { Types } from "mongoose";
import categoryModel from "../models/categoryModel";
import productModel from "../models/productModel";
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    Min,
    MinLength,
    IsBoolean,
    Validate,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
class isNameUnique implements ValidatorConstraintInterface {
    async validate(name: string) {
        const product = await productModel.findOne({ name });
        return !product;
    }
    defaultMessage = () => "El nombre de este producto ya está en uso";
}

@ValidatorConstraint({ async: true })
class isCategoryValid implements ValidatorConstraintInterface {
    async validate(categoryId: any) {
        try {
            const id = String(categoryId);
            if (!Types.ObjectId.isValid(id)) return false;

            const category = await categoryModel.findById(id);
            return !!category;
        } catch {
            return false;
        }
    }
    defaultMessage = () => "La categoría no existe en la base de datos";
}

export class CreateProductDto {
    @IsString({ message: "El nombre debe ser un texto" })
    @IsNotEmpty({ message: "El nombre del producto es obligatorio" })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
    @Validate(isNameUnique)
    name!: string;

    @IsString({ message: "La descripción debe ser un texto" })
    @IsNotEmpty({ message: "La descripción del producto es obligatoria" })
    description!: string;

    @IsBoolean({ message: "El campo activo debe ser un valor booleano" })
    @IsOptional()
    active?: boolean;

    @IsString({ message: "La imagen debe ser un texto (URL o path)" })
    @IsOptional()
    image?: string;

    @IsNumber({}, { message: "El precio debe ser un número" })
    @Min(0.01, { message: "El precio debe ser mayor a 0" })
    price!: number;

    @IsNotEmpty({ message: "La categoría es obligatoria" })
    @Validate(isCategoryValid)
    category!: string;
}

export class UpdateProductDto {
    @IsString({ message: "La descripción debe ser un texto" })
    @IsOptional()
    description?: string;

    @IsBoolean({ message: "El campo activo debe ser un valor booleano" })
    @IsOptional()
    active?: boolean;

    @IsString({ message: "La imagen debe ser un texto (URL o path)" })
    @IsOptional()
    image?: string;

    @IsNumber({}, { message: "El precio debe ser un número" })
    @Min(0.01, { message: "El precio debe ser mayor a 0" })
    @IsOptional()
    price?: number;

    @Validate(isCategoryValid)
    @IsOptional()
    category?: string;
}