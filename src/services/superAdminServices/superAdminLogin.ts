import { Request, Response } from "express";
import { loginSchema } from "../../validators/validations";
import bcrypt from "bcryptjs";
import SuperAdmin, {
  SuperAdminAttributes,
} from "../../entities/super-admin-entity";
import { generateToken } from "../../helperFunctions/helpers";

export const loginSuperAdmin = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const validateInput = await loginSchema.validateAsync(request.body);

    if (validateInput.error) {
      return response.status(400).json({
        Error: validateInput.error.details[0].message,
      });
    }

    const admin = (await SuperAdmin.findOne({
      where: { email },
    })) as unknown as SuperAdminAttributes;

    if (!admin) {
      return response.status(404).json({
        message: `admin does not exist`,
      });
    }
    const validatePassword = await bcrypt.compare(password, admin.password);

    if (!validatePassword) {
      return response.status(401).send({
        status: "error",
        message: "Password is Incorect",
      });
    }

    const tokenData = {
      id: admin.id,
      email: admin.email,
    };
    const token = await generateToken(tokenData);

    return response.status(201).json({
      status: "success",
      message: "Login Successful",
      admin,
      token,
    });
  } catch (error: any) {
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};
