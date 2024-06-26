import { Module } from '@nestjs/common';
import { EspaciosModule } from './espacios/espacios.module';

@Module({
  imports: [EspaciosModule],
})
export class AppModule {}
 