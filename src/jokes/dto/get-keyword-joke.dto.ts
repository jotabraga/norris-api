import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { IsNotNumberStringConstraint } from '../validators/isNotNumber.validator';
export class GetKeywordJokeDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsNotNumberStringConstraint)
  readonly keyword: string;
}
