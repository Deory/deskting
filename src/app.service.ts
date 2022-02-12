import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHeXlo(name: string, key?: string): string {
    return `Hello ${name} with ${key || 'empty'}`;
  }
}
