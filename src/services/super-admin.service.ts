import { Request, Response } from 'express';
// import { superAdminRepository } from '../entities/super-admin.entity';
import { v4 } from 'uuid';
import { getRepository } from 'typeorm';
import {SuperAdmin} from '../entities/super-admin.entity'



export class SuperAdmiService {

 async createSuperAdmin (request: Request, response: Response) {
     
    //  private class userRepository = getRepository(superAdminRepository);

    const userRepository = getRepository(SuperAdmin)

     try {
      const {
        first_name,
        last_name,
        email,
        phone,
        password,
        confirm_password
      } = request.body;

      if (password !== confirm_password) {
        return response.status(400).json({
          status: "error",
          message: "Password mismatch"
        });
      }

      const newAdmin = userRepository.create({
        id: v4(),
        first_name,
        last_name,
        email,
        phone,
        password
      });

      const confirm = await userRepository.save(newAdmin);

      if (!confirm) {
        return response.status(400).json({
          status: "error",
          message: "Something went wrong"
        });
      }

      response.status(200).json({
        status: "success",
        message: "Super Admin created successfully",
        newAdmin
      });

    } catch (error: any) {
      return response.status(500).json({
        status: "error",
        message: `Internal Server Error: ${error}`
      });
    }
  }

}