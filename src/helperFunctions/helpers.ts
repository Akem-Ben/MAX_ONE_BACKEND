import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Code_Locations } from "../interfaces/locations.interface";

dotenv.config();

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateToken = async (data: any) => {
  return jwt.sign(data, `${process.env.APP_SECRET}`, {expiresIn: `15h`});
};

export const generateAgentCode = (location: string, oldCode:string) => {
    location = location.toUpperCase()

    const locationKey = location.toUpperCase() as keyof typeof Code_Locations;

    const code_location = Code_Locations[locationKey]

    let newCode:string;

    if(oldCode.length === 0){
        newCode = `MAX-${code_location}-CH-1`
    }else{
        newCode = `MAX-${code_location}-CH-${Number(oldCode) + 1}`
    }
    return newCode
}

export const generateUserCode = (location: string, oldCode:string) => {
  location = location.toUpperCase()

  const locationKey = location.toUpperCase() as keyof typeof Code_Locations;

  const code_location = Code_Locations[locationKey]

  let newCode:string;

  if(oldCode.length === 0){
      newCode = `MAX-${code_location}-1`
  }else{
      newCode = `MAX-${code_location}-${Number(oldCode) + 1}`
  }
  return newCode
}

export const generatePassword = (last_name:string) => {
    const newPassword = last_name += Math.floor(1000 + Math.random() * 90000)
    return newPassword
}