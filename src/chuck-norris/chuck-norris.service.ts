import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
// import axios from 'axios';

@Injectable()
export class ChuckNorrisService {
  getChuckNorrisApi(): AxiosInstance {
    return axios.create({ baseURL: process.env.NORRIS_API_URL });
  }
}
