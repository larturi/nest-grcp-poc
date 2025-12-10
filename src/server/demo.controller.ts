import { Controller } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoServiceController, DemoServiceControllerMethods, HelloRequest, HelloResponse, SumRequest, SumResponse } from '../common/proto/demo';

@Controller()
@DemoServiceControllerMethods()
export class DemoController implements DemoServiceController {
  constructor(private readonly demoService: DemoService) { }

  getHello(request: HelloRequest): HelloResponse {
    console.log('📨 Recibida solicitud:', request);
    try {
      const response = this.demoService.getHello(request);
      console.log('✅ Enviando respuesta:', response);
      return response;
    } catch (error) {
      console.error('❌ Error en controlador:', error);
      throw error;
    }
  }

  sum(request: SumRequest): SumResponse {
    console.log('📨 Recibida solicitud suma:', request);
    return this.demoService.sum(request);
  }
}
