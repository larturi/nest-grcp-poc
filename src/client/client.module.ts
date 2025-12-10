import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ClientService } from './client.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'DEMO_PACKAGE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'demo',
            protoPath: join(__dirname, '../../proto/demo.proto'),
            url: configService.get<string>('GRPC_URL') || 'localhost:5001',
          },
        }),
      },
    ]),
  ],
  providers: [ClientService],
})
export class ClientModule { }
