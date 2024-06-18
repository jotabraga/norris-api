import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class ChuckNorrisService {
  private readonly chuckNorrisApi: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    const norrisApiUrl = this.configService.get<string>('NORRIS_API_URL');
    this.chuckNorrisApi = axios.create({ baseURL: norrisApiUrl });
  }

  getChuckNorrisApi(): AxiosInstance {
    return this.chuckNorrisApi;
  }
}
