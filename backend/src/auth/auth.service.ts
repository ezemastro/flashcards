import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/longin.dto';
import { JwtService } from '@nestjs/jwt';
import { VerifyEmailDto } from './dto/verify-email.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerNewUser(registerUserDto: RegisterUserDto) {
    const hashedPassword = bcrypt.hashSync(registerUserDto.password, 10);
    // se pasan los valores de registerUserDto y el password encriptado al metodo de createNewUser
    await this.usersService.createNewUser({
      ...registerUserDto,
      password: hashedPassword,
    });
    return { message: 'User has been created successfully, verify your email' };
  }

  async logIn(logInDto: LoginDto) {
    const user = await this.usersService.findByEmailNotValidated(
      logInDto.email,
    );
    // se verifica si el email esta validado
    if (user.email_verified === false) {
      throw new UnauthorizedException('Email not verified');
    }
    // se verifica si el usuario existe
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // se verifica si la contraseña es valida
    const isPasswordValid = await bcrypt.compare(
      logInDto.password,
      user.password,
    );
    // si la contraseña no es valida se lanza una excepcion
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { id_user: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'User has been logged in successfully',
      id: user.id,
      user_name: user.user_name,
      jwt: token,
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    await this.usersService.verifyEmail({
      email: verifyEmailDto.email,
      otp: verifyEmailDto.otp,
    });
    return { message: 'Email has been verified successfully' };
  }
}
