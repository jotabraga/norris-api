import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class ChuckNorrisService {
  private readonly chuckNorrisApi: AxiosInstance;

  constructor() {
    this.chuckNorrisApi = axios.create({ baseURL: process.env.NORRIS_API_URL });
  }

  getChuckNorrisApi(): AxiosInstance {
    return this.chuckNorrisApi;
  }
}
