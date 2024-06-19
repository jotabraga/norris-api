import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class RegisterJokeLogDto {
  @ApiProperty({
    description: 'The query type of search: random or by keyword',
    example: 'random',
  })
  @IsString()
  readonly queryType: string;

  @ApiProperty({ description: 'The time and hour of the request' })
  @IsString()
  readonly timestamp: string;

  @ApiProperty({
    description: 'The search term in case of search joke by keyword',
  })
  @IsOptional()
  readonly searchTerm: string | null;

  @ApiProperty({ description: 'The returned joke' })
  @IsString()
  readonly result: string;
}
