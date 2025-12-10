import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServerModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'demo',
        protoPath: join(__dirname, '../../proto/demo.proto'),
        url: process.env.GRPC_URL || 'localhost:5001',
      },
    },
  );

  await app.listen();
  console.log(`🚀 Servidor gRPC iniciado en ${process.env.GRPC_URL || 'localhost:5001'}`);
}

bootstrap().catch(err => {
  console.error('Error iniciando servidor:', err);
  process.exit(1);
});
