import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class GetJokeLogsDto {
  @ApiPropertyOptional({
    description: 'The start date of jokes logs period query',
    example: '2024-06-19T00:39:05.672Z',
  })
  @IsString()
  @IsOptional()
  readonly startDate?: string;

  @ApiPropertyOptional({
    description: 'The end date of jokes logs period query',
    example: '2024-06-19T00:39:05.672Z',
  })
  @IsString()
  @IsOptional()
  readonly endDate?: string;
}
