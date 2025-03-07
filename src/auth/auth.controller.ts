import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/longin.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerNewUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerNewUser(registerUserDto);
  }

  @Post('login')
  async logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto);
  }

  @Patch('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }
}
