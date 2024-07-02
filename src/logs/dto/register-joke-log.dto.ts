import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class RegisterJokeLogDto {
  @ApiProperty({
    description: 'The query type of search: random or by keyword',
    example: 'random',
  })
  @IsString()
  readonly queryType: string;

  @ApiProperty({
    description: 'The time and hour of the request',
    example: '2024-06-19T00:39:05.672Z',
  })
  @IsString()
  readonly timestamp: string;

  @ApiProperty({
    description: 'The search term in case of search joke by keyword',
    example: 'patinete',
  })
  @IsOptional()
  readonly searchTerm: string | null;

  @ApiProperty({
    description: 'The returned joke',
    example:
      'Chuck Norris once appeared on Cartoon Network. CN is now known as Chuck Norris',
  })
  @IsString()
  readonly result: string;
}
