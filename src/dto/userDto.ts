import userModel from "../models/userModel";
import roleModel from "../models/roleModel";
import { Types } from "mongoose";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  MinLength
} from "class-validator";

@ValidatorConstraint({ async: true })
class isEmailUnique implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = await userModel.findOne({ email });
    return !user;
  }
  defaultMessage = () => "El correo ya está en uso";
}

@ValidatorConstraint({ async: true })
class isRoleValid implements ValidatorConstraintInterface {
  async validate(roleId: any) {
    try {
      const id = String(roleId); // Para evitar CastError
      
      if (!Types.ObjectId.isValid(id)) {
        return false;
      }
      const role = await roleModel.findById(id);
      return !!role;
    } catch (err) {
      return false;
    }
  }
  defaultMessage = () => "El rol no existe en la base de datos";
}

export class CreateUserDto {
  @IsString({ message: "El nombre debe ser un texto" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  name!: string;

  @IsString({ message: "El apellido debe ser un texto" })
  @MinLength(3, { message: "El apellido debe tener al menos 3 caracteres" })
  @IsNotEmpty({ message: "El apellido es obligatorio" })
  lastName!: string;

  @IsEmail({}, { message: "El correo no tiene un formato válido" })
  @IsNotEmpty({ message: "El correo es obligatorio" })
  @Validate(isEmailUnique)
  email!: string;

  @IsInt({ message: "La edad debe ser un número entero" })
  @Min(1, { message: "La edad no puede ser menor a uno" })
  @IsOptional()
  age?: number;

  @IsNotEmpty({ message: "El rol es obligatorio" })
  @Validate(isRoleValid)
  role!: string;
}

export class UpdateUserDto {
  @IsString({ message: "El nombre debe ser un texto" })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  @IsOptional()
  name?: string;

  @IsString({ message: "El apellido debe ser un texto" })
  @MinLength(3, { message: "El apellido debe tener al menos 3 caracteres" })
  @IsOptional()
  lastName?: string;

  @IsEmail({}, { message: "El correo no tiene un formato válido" })
  @Validate(isEmailUnique)
  @IsOptional()
  email?: string;

  @IsInt({ message: "La edad debe ser un número entero" })
  @Min(1, { message: "La edad no puede ser menor a uno" })
  @IsOptional()
  age?: number;

  @Validate(isRoleValid)
  @IsOptional()
  role?: string;
}