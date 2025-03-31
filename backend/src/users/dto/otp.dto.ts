import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class OtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}
