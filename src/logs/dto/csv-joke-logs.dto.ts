import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class CsvJokeLogsDto {
  @ApiProperty({
    description: 'The returned joke',
    example: 'Chuck Norris sprinkles iron filings on his cappacinos.',
  })
  @IsString()
  readonly Joke: string;

  @ApiProperty({
    description: 'The query type: random or by keyword',
    example: 'random',
  })
  @IsString()
  readonly 'Query type': 'random' | 'keyword';

  @ApiProperty({
    description: 'The time and hour of the request',
    example: '2024-06-19T00:39:05.672Z',
  })
  @IsString()
  readonly Timestamp: string;

  @ApiProperty({
    description: 'The keyword in the case of search by keyword query',
    example: 'fun',
  })
  @IsString()
  @IsOptional()
  readonly 'Search term': string;
}
