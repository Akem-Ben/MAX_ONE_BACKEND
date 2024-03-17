import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import SuperAdmin from "../entities/super-admin-entity";
import Agent from "../entities/agentEntity";


//==============AUTHORISATION FUNCTION FOR THE SUPERADMIN===============//
export const superAdminAuthorizationFunction = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {

    //This block of codes check if the token is present in the request header
    const authorization = request.headers.authorization;

    if (authorization === undefined) {
      return response.status(401).json({
        message: `You are not authorized to view this page, login please`,
      });
    }

    //This block of codes extract the token from the request header
    const token = authorization.split(" ");
    const mainToken = token[1];
    if (!mainToken || mainToken === "") {
      return response.status(401).json({
        status: `Failed`,
        message: `Login required`,
      });
    }

    //This block of codes verify the token and validate that the user is a superadmin
    const decode: any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);

    const superAdmin: any = await SuperAdmin.findOne({
      where: { id: decode.id },
    });

    if (!superAdmin) {
      return response.status(400).json({
        status: `error`,
        message: `Only admin can access this resource`,
      });
    }

    //This block of codes assign the admin details extracted from the code to the request object
    request.user = decode;
    next();
  } catch (error: any) {
    console.log(error.message);
  }
};


//==============GENERAL AUTHORISATION FUNCTION THAT WORKS WITH BOTH ADMIN AND AGENTS===============//
export const generalAuthorisationFunction = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {

     //This block of codes check if the token is present in the request header
    const authorization = request.headers.authorization;

    if (authorization === undefined) {
      return response.status(401).json({
        message: `You are not authorized to view this page, login please`,
      });
    }
    
    //This block of codes extract the token from the request header
    const token = authorization.split(" ");
    const mainToken = token[1];
    if (!mainToken || mainToken === "") {
      return response.status(401).json({
        status: `Failed`,
        message: `Login required`,
      });
    }
    
    //This block of codes verify the token and validate that the user is either a superadmin or an agent
    const decode: any = jwt.verify(mainToken, `${process.env.APP_SECRET}`);

    const superAdmin: any = await SuperAdmin.findOne({
      where: { id: decode.id },
    });

    const agent = await Agent.findOne({ where: { id: decode.id } });

    if (!superAdmin && !agent) {
      return response.status(400).json({
        status: `error`,
        message: `You are not allowed to access this resource. Only the admin or agent can access this resource`,
      });
    }
    
    //This block of codes assign the user details extracted from the code to the request object
    request.user = decode;
    next();
  } catch (error: any) {
    console.log(error.message);
  }
};
