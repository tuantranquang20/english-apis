import * as Joi from 'joi';
import ConfigKey from './config-key';

export default Joi.object({
  [ConfigKey.APP_PORT]: Joi.string().default(3000),
  [ConfigKey.URL_MONGOOSE]: Joi.string().required(),
  [ConfigKey.APP_CORS]: Joi.string().default('*'),
  [ConfigKey.JWT_ACCESS_TOKEN_SECRET_KEY]: Joi.string().required(),
  [ConfigKey.JWT_ACCESS_TOKEN_EXPIRED_IN]: Joi.number().required(),
});
