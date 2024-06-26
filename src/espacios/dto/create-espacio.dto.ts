import { TipoEspacio } from '@prisma/client'
import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString} from 'class-validator'
import { TipoEspacioList } from 'src/enum/espacios.enum'
export class CreateEspacioDto {
    @IsString()
    nombre: string

    @IsOptional()
    @IsBoolean()
    disponible?: boolean = true
    
    @IsOptional()
    @IsBoolean()
    estado?: boolean = true

    @IsEnum(TipoEspacioList, {
        message: `El espacio debe pertenecer a: ${TipoEspacioList}`
    })
    disciplina: TipoEspacio

    imagen: any

}
