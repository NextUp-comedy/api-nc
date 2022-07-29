import Joi from 'joi';
import { IEmailConfigs } from '../interfaces/email';

const envVarsSchema = Joi.object({
  SENDGRID_ADMIN_EMAIL: Joi.string().email().required(),
  SENDGRID_API_KEY: Joi.string().required(),
  SENDGRID_VERIFICATION_TEMPLATE_ID: Joi.string().required(),
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID: Joi.string().required(),
  SENDGRID_APPROVAL_TEMPLATE_ID: Joi.string().required(),
  SENDGRID_REJECTION_TEMPLATE_ID: Joi.string().required(),
  NEXTUP_COMEDY_SUPPORT_EMAIL: Joi.string().email().required(),
}).unknown().required();

const config = (): IEmailConfigs => {
  const { error, value: envVars } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    SENDGRID_ADMIN_EMAIL: envVars.SENDGRID_ADMIN_EMAIL,
    SENDGRID_API_KEY: envVars.SENDGRID_API_KEY,
    SENDGRID_VERIFICATION_TEMPLATE_ID: envVars.SENDGRID_VERIFICATION_TEMPLATE_ID,
    SENDGRID_RESET_PASSWORD_TEMPLATE_ID: envVars.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
    SENDGRID_APPROVAL_TEMPLATE_ID: envVars.SENDGRID_APPROVAL_TEMPLATE_ID,
    SENDGRID_REJECTION_TEMPLATE_ID: envVars.SENDGRID_REJECTION_TEMPLATE_ID,
    NEXTUP_COMEDY_SUPPORT_EMAIL: envVars.NEXTUP_COMEDY_SUPPORT_EMAIL,
  };
};

export default config;
