import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class CsvJokeLogsDto {
  @ApiProperty({ description: 'The returned joke' })
  @IsString()
  readonly Joke: string;

  @ApiProperty({ description: 'The query type: random or by keyword' })
  @IsString()
  readonly 'Query type': string;

  @ApiProperty({ description: 'The time and hour of the request' })
  @IsString()
  readonly Timestamp: string;

  @ApiProperty({
    description: 'The keyword in the case of search by keyword query',
  })
  @IsString()
  @IsOptional()
  readonly 'Search term': string;
}
