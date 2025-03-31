// Primero crea el decorador get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Types } from 'mongoose';
// Este decorador se encarga de obtener el id del usuario que se encuentra en el token.
// Se puede obtener el id del usuario o cualquier otro valor que se encuentre en el token.
// Para obtener el id del usuario se debe pasar como argumento el string 'id_user'.
// Ejemplo:
// @Get()
// @UseGuards(AuthGuard)
// getProfile(@GetUser('id_user') id_user: string) {}
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      const id_user = request.user[data];
      // Si el id del usuario es un ObjectId válido, lo devuelve.
      if (id_user) {
        if (Types.ObjectId.isValid(id_user)) {
          return id_user;
        }
      }
    }
  },
);
