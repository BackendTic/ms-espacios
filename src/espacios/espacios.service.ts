import { BadRequestException, Inject, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';
import { PrismaClient, TipoEspacio } from '@prisma/client';
import { RESERVAS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EspaciosService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger()
  
  async onModuleInit() {
    await this.$connect()
    this.logger.log('Database conected')
  }

  constructor(
    @Inject(RESERVAS_SERVICE)
    private readonly reservasClient: ClientProxy,
  ){
    super()
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

  findSpacesDiscipline(Disciplina: TipoEspacio) {
    return this.espacio.findMany({
      where:{disciplina: Disciplina, estado:true}
    });
  }

  async findOne(id: string) {
    const espacio = await this.espacio.findUnique({
      where: { id, estado:true  },
    });
    return espacio
  }

  async update(id: string, updateEspacioDto: UpdateEspacioDto) {
    const espacioUpdate= await this.espacio.update({
      where: { id },
      data: updateEspacioDto,
    });
    await this.reservasClient.send('changeNameSpaceTimeSlot',{espacioId:espacioUpdate.id, nombre:espacioUpdate.nombre}).toPromise()
    return espacioUpdate 
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
