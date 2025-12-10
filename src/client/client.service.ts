import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { DemoServiceClient, DEMO_SERVICE_NAME } from '../common/proto/demo';

@Injectable()
export class ClientService implements OnModuleInit {
  private demoService?: DemoServiceClient;

  constructor(
    @Inject('DEMO_PACKAGE') private client: ClientGrpc,
  ) { }

  onModuleInit() {
    this.demoService = this.client.getService<DemoServiceClient>(DEMO_SERVICE_NAME);
  }

  async callHello(name: string): Promise<void> {
    if (!this.demoService) {
      throw new Error('Service not initialized');
    }
    try {
      const response = await firstValueFrom(this.demoService.getHello({ name }));
      console.log('✅ Respuesta del servidor:', response);
    } catch (error) {
      console.error('❌ Error llamando a GetHello:', error);
      throw error;
    }
  }

  async callSum(a: number, b: number): Promise<void> {
    if (!this.demoService) {
      throw new Error('Service not initialized');
    }
    try {
      const response = await firstValueFrom(this.demoService.sum({ a, b }));
      console.log(`✅ Suma de ${a} + ${b} =`, response.result);
    } catch (error) {
      console.error('❌ Error llamando a Sum:', error);
      throw error;
    }
  }
}
