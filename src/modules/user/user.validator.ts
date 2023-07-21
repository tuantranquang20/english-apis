import Joi from '@src/commons/plugins/joi';

export const createUserValidator = Joi.object({
  username: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().required(),
});
