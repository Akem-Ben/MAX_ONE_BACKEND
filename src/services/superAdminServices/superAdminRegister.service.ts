import { Request, Response } from "express";
import { v4 } from "uuid";
import SuperAdmin, {
  SuperAdminAttributes,
} from "../../entities/super-admin-entity";
import { hashPassword } from "../../helperFunctions/helpers";
import { registerAdminSchema } from "../../validators/validations";



//==============REGISTRATION FUNCTION FOR CREATING SUPER ADMIN===============//

export const createSuperAdmin = async (
  request: Request,
  response: Response
) => {
  try {

    //This fetches and validates the required input from the request body
    const { first_name, last_name, email, phone, password, confirm_password } =
      request.body;

    const validate = await registerAdminSchema.validateAsync(request.body);

    if (validate.error) {
      return response.status(400).json({
        Error: validate.error.details[0].message,
      });
    }

    //This checks if the email already exists in the database
    const validateEmail = await SuperAdmin.findOne({ where: { email } });

    if (validateEmail) {
      return response.status(400).json({
        status: `error`,
        message: `${email} already in use`,
      });
    }

    //This checks if the password and confirm_password match
    if (password !== confirm_password) {
      return response.status(400).json({
        status: "error",
        message: "Password mismatch",
      });
    }

    //This hashes the password
    const newPassword = await hashPassword(password);

    //This creates a new super admin
    const newAdmin = (await SuperAdmin.create({
      id: v4(),
      first_name,
      last_name,
      email,
      phone,
      password: newPassword,
    })) as unknown as SuperAdminAttributes;

    //This checks if the new admin was created successfully
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
      admin: {
        id: v4(),
        first_name: newAdmin.first_name,
        last_name: newAdmin.last_name,
        email: newAdmin.email,
        phone: newAdmin.phone,
      }
      
    });


  } catch (error: any) {
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${error}`,
    });
  }
};
