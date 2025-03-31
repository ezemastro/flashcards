import { UnauthorizedException } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';

export interface OTPData {
  otp: string;
  expiration: Date;
}

export class OTPService {
  public static async generateOTP(time: number = 5): Promise<OTPData> {
    try {
      const otp = otpGenerator.generate(7, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + time);
      return { otp, expiration };
    } catch (error) {
      console.error('Error al generar el otp:', error);
      throw new Error('no se a podido generar el otp');
    }
  }

  public static async verifyOTP(
    otp: string, //otp enviado por el usuario
    validateData: OTPData, //otp generado por el sistema obtenido de la db
  ): Promise<boolean> {
    const now = new Date();
    if (otp === validateData.otp) {
      if (now < validateData.expiration) {
        return true;
      } else {
        throw new UnauthorizedException('El codigo de verificacion a expirado');
      }
    } else {
      throw new UnauthorizedException('El codigo de verificacion no es valido');
    }
  }
}
