import { Request, Response } from "express";
import { v4 } from "uuid";
import SuperAdmin, {
  SuperAdminAttributes,
} from "../../entities/super-admin-entity";
import { hashPassword } from "../../helperFunctions/helpers";
import { registerAdminSchema } from "../../validators/validations";

export const createSuperAdmin = async (
  request: Request,
  response: Response
) => {
  try {
    const { first_name, last_name, email, phone, password, confirm_password } =
      request.body;

    const validate = await registerAdminSchema.validateAsync(request.body);

    if (validate.error) {
      return response.status(400).json({
        Error: validate.error.details[0].message,
      });
    }

    const validateEmail = await SuperAdmin.findOne({ where: { email } });

    if (validateEmail) {
      return response.status(400).json({
        status: `error`,
        message: `${email} already in use`,
      });
    }

    if (password !== confirm_password) {
      return response.status(400).json({
        status: "error",
        message: "Password mismatch",
      });
    }

    const newPassword = await hashPassword(password);

    const newAdmin = (await SuperAdmin.create({
      id: v4(),
      first_name,
      last_name,
      email,
      phone,
      password: newPassword,
    })) as unknown as SuperAdminAttributes;

    const newAdminInstance = await SuperAdmin.findOne({
      where: { id: newAdmin.id },
    });

    if (!newAdminInstance) {
      return response.status(400).json({
        status: "error",
        message: "Something went wrong",
      });
    }

    response.status(201).json({
      status: "success",
      message: "Super Admin created successfully",
      newAdminInstance,
    });
  } catch (error: any) {
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${error}`,
    });
  }
};
