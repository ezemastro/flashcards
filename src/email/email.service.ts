import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async verifyEmail(name: string, email: string, otp: string) {
    try {
      const subject = `CODECODE. Verificacion de email`;
      console.log(email);
      await this.mailerService.sendMail({
        to: email,
        subject,
        template: 'verify_email',
        context: {
          name,
          email,
          otp,
        },
      });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new InternalServerErrorException(
        'no se a podido crear el usuario, ya que la funcionalidad de verificar email no esta disponible',
      );
    }
  }
}
