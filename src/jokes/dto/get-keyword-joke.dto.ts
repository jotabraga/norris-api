import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { IsNotNumberStringConstraint } from '../validators/isNotNumber.validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetKeywordJokeDto {
  @ApiProperty({ description: 'The keyword to search for a specific joke' })
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotNumberStringConstraint)
  readonly keyword: string;
}
