import { IsString, IsOptional } from 'class-validator';

export class RegisterJokeLogDto {
  @IsString()
  readonly queryType: string;

  @IsString()
  readonly timestamp: string;

  @IsOptional()
  readonly searchTerm: string | null;

  @IsString()
  readonly result: string;
}
