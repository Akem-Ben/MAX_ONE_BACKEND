import {Response, NextFunction} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import SuperAdmin from '../entities/super-admin-entity';
import Agent from '../entities/agentEntity';

export const superAdminAuthorizationFunction = async (
    request: JwtPayload,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = request.headers.authorization;
  
      if (authorization === undefined) {
        return response.status(401).json({
          message: `You are not authorized to view this page, login please`,
        });
      }
  
      const token = authorization.split(" ");
      const mainToken = token[1];
      if (!mainToken || mainToken === "") {
        return response.status(401).json({
          status: `Failed`,
          message: `Login required`,
        });
      }
  
      const decode:any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);
      const superAdmin:any = await SuperAdmin.findOne({where: {id:decode.id}})
  
      if(!superAdmin){
        return response.status(400).json({
          status: `error`,
          message: `You are not allowed to access this resource. Please Login`
        })
      }
  
      request.user = decode;
      next();
    } catch (error: any) {
      console.log(error.message);
    }
  };


  export const generalAuthorisationFunction = async (
    request: JwtPayload,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const authorization = request.headers.authorization;
  
      if (authorization === undefined) {
        return response.status(401).json({
          message: `You are not authorized to view this page, login please`,
        });
      }
  
      const token = authorization.split(" ");
      const mainToken = token[1];
      if (!mainToken || mainToken === "") {
        return response.status(401).json({
          status: `Failed`,
          message: `Login required`,
        });
      }
  
      const decode:any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);

      const superAdmin:any = await SuperAdmin.findOne({where: {id:decode.id}})
      
      const agent = await Agent.findOne({where: {id:decode.id}})

      if(!superAdmin && !agent){
        return response.status(400).json({
          status: `error`,
          message: `You are not allowed to access this resource. Only the admin or agent can access this resource`
        })
      }
  
      request.user = decode;
      next();
    } catch (error: any) {
      console.log(error.message);
    }
  };