import 'dotenv/config';
import * as joi from 'joi';

interface EnVars {
  PORT_API: number;
  URL_DB: string;
  SECRET_JWT: string;
  HOST_SMTP_EMAIL: string;
  PORT_SMTP_EMAIL: number;
  AUTH_USER_EMAIL: string;
  AUTH_PASS_EMAIL: string;
  EMAIL_FROM: string;
}

const envSchema = joi
  .object({
    PORT_API: joi.number().required(),
    URL_DB: joi.string().required(),
    SECRET_JWT: joi.string().required(),
    HOST_SMTP_EMAIL: joi.string().required(),
    PORT_SMTP_EMAIL: joi.number().required(),
    AUTH_USER_EMAIL: joi.string().required(),
    AUTH_PASS_EMAIL: joi.string().required(),
    EMAIL_FROM: joi.string().required(),
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
  host_smtp_email: envVars.HOST_SMTP_EMAIL,
  port_smtp_email: envVars.PORT_SMTP_EMAIL,
  auth_user_email: envVars.AUTH_USER_EMAIL,
  auth_pass_email: envVars.AUTH_PASS_EMAIL,
  email_from: envVars.EMAIL_FROM,
};
