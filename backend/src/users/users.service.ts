import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OTPData, OTPService } from 'src/config/otp';
import { OtpDto } from './dto/otp.dto';
import { EmailService } from 'src/email/email.service';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly emailService: EmailService,
  ) {}

  async createNewUser(registerUserDto: RegisterUserDto) {
    try {
      const existUserName = await this.userModel.findOne({
        user_name: registerUserDto.user_name,
      });
      if (existUserName) {
        throw new BadRequestException('User name already exists');
      }
      //Generar usuario
      const newUser = new this.userModel(registerUserDto);
      //Generar codigo otp El codigo se genera con una expiracion de 15 minutos
      const otp: OTPData = await OTPService.generateOTP(15);
      newUser.code_otp = otp.expiration.toString();
      newUser.code_op_expired = otp.expiration;
      //Enviar email
      await this.emailService.verifyEmail(
        registerUserDto.user_name,
        registerUserDto.email,
        otp.otp,
      );
      //Guardar usuario a la db
      await newUser.save();
      return { message: 'User created' };
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string) {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const user = await this.userModel.findById(new Types.ObjectId(id));
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new BadRequestException(`User not found with this email ${email}`);
    }
    return user;
  }

  async verifyEmail(optDto: OtpDto) {
    //Buscar usuario por email
    const user = await this.findByEmail(optDto.email);
    //Verificar que el codigo sea valido
    const otpdataDb: OTPData = {
      otp: user.code_otp,
      expiration: user.code_op_expired,
    };
    // el primer parametro es el codigo que el usuario envia
    // el segundo parametro es el objeto que contiene el codigo y la fecha de expiracion
    const isValid = await OTPService.verifyOTP(optDto.otp, otpdataDb);
    if (isValid) {
      user.email_verified = true;
      user.code_otp = null;
      user.code_op_expired = null;
      await user.save();
      return 'Email verified';
    }
    throw new BadRequestException('Invalid OTP');
  }

  async findByEmailNotValidated(email: string) {
    const user = await this.userModel.findOne({
      email: email,
    });
    return user;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
