import { IsString, IsOptional } from 'class-validator';
export class GetJokeLogsDto {
  @IsString()
  @IsOptional()
  readonly startDate: string;

  @IsString()
  @IsOptional()
  readonly endDate: string;
}
