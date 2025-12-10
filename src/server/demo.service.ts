import { Injectable } from '@nestjs/common';
import { HelloRequest, HelloResponse, SumRequest, SumResponse } from '../common/proto/demo';

@Injectable()
export class DemoService {
  getHello(request: HelloRequest): HelloResponse {
    return {
      message: `Hola ${request.name}`,
    };
  }

  sum(request: SumRequest): SumResponse {
    return {
      result: request.a + request.b,
    };
  }
}
