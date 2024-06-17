import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotNumberString', async: false })
export class IsNotNumberStringConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean {
    if (typeof value !== 'string') {
      return true;
    }

    return isNaN(Number(value));
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} cannot be a number when converted`;
  }
}
