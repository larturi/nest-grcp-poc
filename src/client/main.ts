import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';
import { ClientService } from './client.service';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);
  await app.init();

  const clientService = app.get(ClientService);

  try {
    console.log('📡 Cliente gRPC iniciando...');
    // Esperar a que onModuleInit se ejecute
    await new Promise(resolve => setTimeout(resolve, 500));
    await clientService.callHello('Leandro');
    await clientService.callSum(10, 5);
  } catch (error) {
    console.error('Error en cliente:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
