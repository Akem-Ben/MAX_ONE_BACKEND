import Joi from "joi";

export const registerAdminSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().required().min(11),
  password: Joi.string().required().min(6),
  confirm_password: Joi.string().required().min(6),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerAgentSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().required().min(11),
  location: Joi.string().required(),
});

export const registerUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().required().min(11),
  location: Joi.string().required(),
  interest: Joi.number().required(),
  sub_channel: Joi.number().required(),
  channel: Joi.number().required(),
  stage: Joi.number().required(),
});
