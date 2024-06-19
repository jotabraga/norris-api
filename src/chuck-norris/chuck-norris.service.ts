import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class ChuckNorrisService {
  private readonly chuckNorrisApi: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.chuckNorrisApi = axios.create({ baseURL: process.env.NORRIS_API_URL });
  }

  getChuckNorrisApi(): AxiosInstance {
    return this.chuckNorrisApi;
  }
}
