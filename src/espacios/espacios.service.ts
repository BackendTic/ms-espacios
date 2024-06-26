import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EspaciosService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger()
  
  async onModuleInit() {
    await this.$connect()
    this.logger.log('Database conected')
  }

  create(createEspacioDto: CreateEspacioDto) {
    return this.espacio.create({
      data: createEspacioDto
    });
  }

  findAll() {
    return this.espacio.findMany({
      where:{estado: true}
    });
  }

  async findOne(id: string) {
    const espacio = await this.espacio.findUnique({
      where: { id, estado:true  },
    });
    return espacio
  }

  update(id: string, updateEspacioDto: UpdateEspacioDto) {
    return this.espacio.update({
      where: { id },
      data: updateEspacioDto,
    });
  }

 remove(id: string) {
  return this.espacio.update({
    where: { id},
    data: {
      estado:false
    },
  });

  
  }
}
