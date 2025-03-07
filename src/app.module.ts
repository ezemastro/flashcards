import { Module } from '@nestjs/common';
import { DecksModule } from './decks/decks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forRoot(envs.url_db),
    DecksModule,
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: envs.secret_jwt,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
