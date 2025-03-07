import 'dotenv/config';
import * as joi from 'joi';

interface EnVars {
  PORT_API: number;
  URL_DB: string;
  SECRET_JWT: string;
}

const envSchema = joi
  .object({
    PORT_API: joi.number().required(),
    URL_DB: joi.string().required(),
    SECRET_JWT: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`config validation error ${error}`);
}

const envVars: EnVars = value;

export const envs = {
  port: envVars.PORT_API,
  url_db: envVars.URL_DB,
  secret_jwt: envVars.SECRET_JWT,
};
