import { BadRequestException, Controller, InternalServerErrorException, NotFoundException, ParseUUIDPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EspaciosService } from './espacios.service';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';
import { TipoEspacio } from '@prisma/client';

@Controller()
export class EspaciosController {
  constructor(private readonly espaciosService: EspaciosService) {}

  @MessagePattern('createEspacio')
  create(@Payload() createEspacioDto: any) {
    try {
      console.log(createEspacioDto);
      // return createEspacioDto
      return this.espaciosService.create(createEspacioDto);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
    
  }

  @MessagePattern('findAllEspacios')
  findAll() {
    return this.espaciosService.findAll();
  }

  @MessagePattern('findSpacesDiscipline')
  findSpacesDiscipline(disciplina: TipoEspacio) {
    return this.espaciosService.findSpacesDiscipline(disciplina);
  }

  @MessagePattern('findOneEspacio')
  async findOne(id: string) {
  try {
    return await this.espaciosService.findOne(id);
  } catch (error) {
    throw new InternalServerErrorException(error.message); 
  }
}

  @MessagePattern('updateEspacio')
  update(@Payload() updateEspacioDto: any) {
    return this.espaciosService.update(updateEspacioDto.id, updateEspacioDto);
  }

  @MessagePattern('removeEspacio')
  remove(@Payload() id: string) {
    return this.espaciosService.remove(id);
  }
}
