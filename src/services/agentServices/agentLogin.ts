import { Request, Response } from "express";
import { loginSchema } from "../../validators/validations";
import bcrypt from "bcryptjs";
import SuperAdmin, {
  SuperAdminAttributes,
} from "../../entities/super-admin-entity";
import { generateToken } from "../../helperFunctions/helpers";

export const loginAgent = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const validateInput = await loginSchema.validateAsync(request.body);

    if (validateInput.error) {
      return response.status(400).json({
        Error: validateInput.error.details[0].message,
      });
    }

    const agent = (await SuperAdmin.findOne({
      where: { email: email },
    })) as unknown as SuperAdminAttributes;

    if (!agent) {
      return response.status(400).json({ 
        message: `admin does not exist` 
    })
    }
    const validatePassword = await bcrypt.compare(password, agent.password);

    if (!validatePassword) {
      return response.status(401).send({
        status: "error",
        message: "Password is Incorect",
      });
    }

    const tokenData = {
        id: agent.id,
        email: agent.email
    }
    const token = await generateToken(tokenData);
    
    return response.status(200).json({
      status: "success",
      message: "Login Successful",
      agent,
      token,
    });
  } catch (error: any) {
    return response.status(500).json({
        status: `error`, 
        message: `Internal Server Error` 
    });
  }
};
