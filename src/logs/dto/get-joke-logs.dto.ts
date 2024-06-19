import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class GetJokeLogsDto {
  @ApiProperty({ description: 'The start date of jokes logs period query' })
  @IsString()
  @IsOptional()
  readonly startDate: string;

  @ApiProperty({ description: 'The end date of jokes logs period query' })
  @IsString()
  @IsOptional()
  readonly endDate: string;
}
