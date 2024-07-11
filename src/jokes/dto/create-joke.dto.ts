import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateJokeDto {
  @ApiProperty({
    description: 'The joke itself',
    example: 'Any chuck joke',
  })
  @IsString()
  @IsNotEmpty()
  readonly joke: string;

  @ApiProperty({
    description: 'The author',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly author: string;
}
