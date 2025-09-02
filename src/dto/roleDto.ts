import roleModel from "../models/roleModel";
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
        const role = await roleModel.findOne({ name });
        return !role;
    }
    defaultMessage = () => "El nombre de este rol ya está en uso";
}

export class CreateRoleDto {
    @IsString({ message: "El nombre debe ser un texto" })
    @IsNotEmpty({ message: "El nombre es obligatorio" })
    @Validate(isNameUnique)
    name!: string;

    @IsString({ message: "La descripcion debe ser un texto" })
    @IsOptional()
    description!: string;
}
