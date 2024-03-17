import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Code_Locations } from "../interfaces/locations.interface";
import { ProspectQuery } from "../interfaces/user.interface";
import { Sequelize, Op } from "sequelize";

dotenv.config();


//This function hashes passwords
export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//This function generates tokens
export const generateToken = async (data: any) => {
  return jwt.sign(data, `${process.env.APP_SECRET}`, { expiresIn: `15h` });
};

//This function generates agent codes using the location of the agent
export const generateAgentCode = (location: string, oldCode: string) => {
  location = location.toUpperCase();

  const locationKey = location.toUpperCase() as keyof typeof Code_Locations;

  const code_location = Code_Locations[locationKey];

  let newCode: string;

  if (oldCode.length === 0) {
    newCode = `MAX-${code_location}-CH-1`;
  } else {
    newCode = `MAX-${code_location}-CH-${Number(oldCode) + 1}`;
  }
  return newCode;
};

//This function generates user/prospect codes using the location of the user/prospect
export const generateUserCode = (location: string, oldCode: string) => {
  location = location.toUpperCase();

  const locationKey = location.toUpperCase() as keyof typeof Code_Locations;

  const code_location = Code_Locations[locationKey];

  let newCode: string;

  if (oldCode.length === 0) {
    newCode = `MAX-${code_location}-1`;
  } else {
    newCode = `MAX-${code_location}-${Number(oldCode) + 1}`;
  }
  return newCode;
};


//This function generates a new password for a new agent or user/prospect using the lastname
export const generatePassword = (last_name: string) => {
  const newPassword = (last_name += Math.floor(1000 + Math.random() * 90000));
  return newPassword;
};

//This function is used to manage queries (request.query) for the application
export const queryFilter = async (queryItem: ProspectQuery) => {
  const query: any = {};
  if (queryItem?.location) query["location"] = queryItem.location.toLowerCase();
  if (queryItem?.first_name) query["first_name"] = queryItem.first_name;
  if (queryItem?.last_name) query["last_name"] = queryItem.last_name;
  if (queryItem?.phone) query["phone"] = queryItem.phone;
  if (queryItem?.start_date && queryItem?.end_date) {
    query.createdAt = {
      [Op.between]: [queryItem.start_date, queryItem.end_date],
    };
  } else if (queryItem?.start_date) {
    query.createdAt = {
      [Op.gte]: queryItem.start_date,
    };
  } else if (queryItem?.end_date) {
    query.createdAt = {
      [Op.lte]: queryItem.end_date,
    };
  }
  return query;
};
