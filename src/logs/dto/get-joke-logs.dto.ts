import { IsString, IsOptional } from 'class-validator';
export class GetKeywordJokeDto {
  @IsString()
  @IsOptional()
  readonly date: string;
}
