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
    location: Joi.string().required()
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
    stage: Joi.number().required()
  });


// export const validateCreateTarget = Joi.object({
//     name: Joi.string().required()
//     .messages({
//       'any.required': 'Please provide your name.'
//     }),
//     target: Joi.string().required()
//     .messages({
//       'any.required': 'Please provide target name.'
//     }),
//     target_amount: Joi.number().required()
//     .messages({
//       'any.required': 'Target amount is required'
//     }),
//     category: Joi.string().required().valid('Travel', 'Dream_Home', 'Dream_Car', 'Other', 'Rent','Gadgets')
//     .messages({
//       'any.required': 'Category of saving is not yet filled. Please input.'
//     }),
    
//     frequency: Joi.string().required().valid('Daily', 'Weekly', 'Monthly', 'Annually')
//     .messages({
//       'any.required': 'Frequency of saving is not yet filled. Please input.'
//     }),
//     startDate: Joi.string().required()
//     .messages({
//       'any.required': 'Input start date'
//     }),
//     endDate: Joi.string().required()
//     .messages({
//       'any.required': 'Input end date'
//     }),
//   });

