import { Injectable } from '@nestjs/common';
import { ChuckNorrisService } from 'src/chuck-norris-provider/chuck-norris-provider.service';

@Injectable()
export class JokesService {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}
}
