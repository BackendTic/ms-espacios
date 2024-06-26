
import { IsBoolean,  IsUUID } from "class-validator";


export class ChangeOrderStatusDto{
    @IsUUID(4)
    id: string

    @IsBoolean()
    status: boolean
}