import { Injectable } from '@nestjs/common';
// import axios from 'axios';

@Injectable()
export class ChuckNorrisService {
  getChuckNorrisApi(): string {
    return 'hello world';
  }
}
