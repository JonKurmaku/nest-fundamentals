import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {

  constructor(private devConfing:DevConfigService,
              @Inject('CONFIG') private config: {port: string},
  ){}
  

  getHello(): string {
    return `Hello World! ${this.devConfing.getDBHOST()}
    PORT = ${this.config.port}`;
  }
}
