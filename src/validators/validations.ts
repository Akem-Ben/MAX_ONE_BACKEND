import Joi from "joi";

//Validation rules for validating input from the admin during registration
export const registerAdminSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().required().min(11),
  password: Joi.string().required().min(6),
  confirm_password: Joi.string().required().min(6),
});


//Validation rules for validating input from all users during login
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//Validation rules for validating input from the agent during registration
export const registerAgentSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().required().min(11),
  location: Joi.string().required(),
});


//Validation rules for validating input on the user/prospect during registration
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
