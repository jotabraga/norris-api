import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.singIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('forgot-password/:email')
  public async sendEmailForgotPassword(
    @Param() params: { email: string },
  ): Promise<any> {
    const { email } = params;
    return this.authService.sendEmailResetPassword(email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.token,
    );
  }
}
