import { Controller, Get, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  getUser(): string {
    return 'hello world';
  }
}
