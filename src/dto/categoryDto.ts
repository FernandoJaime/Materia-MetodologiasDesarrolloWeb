import categoryModel from "../models/categoryModel";
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    Validate
} from "class-validator";

@ValidatorConstraint({ async: true })
class isNameUnique implements ValidatorConstraintInterface {
    async validate(name: string) {
        const category = await categoryModel.findOne({ name });
        return !category;
    }
    defaultMessage = () => "El nombre de esta categoria ya está en uso";
}

export class CreateCategoryDto {
    @IsString({ message: "El nombre debe ser un texto" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @Validate(isNameUnique)
    name!: string;

    @IsString({ message: "La descripcion debe ser un texto" })
    @IsOptional()
    description!: string;
}