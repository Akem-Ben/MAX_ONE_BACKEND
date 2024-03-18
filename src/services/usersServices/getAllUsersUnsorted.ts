import { Request, Response } from "express";
import { queryFilter } from "../../helperFunctions/helpers";
import Users, { UserAttributes } from "../../entities/usersEntity";

//==============FUNCTION FOR FETCHING ALL USER/PROSPECT'S IN A SORTED FASHION===============//

export const getAllProspectsUnsorted = async (
  request: Request,
  response: Response
) => {
  try {
    //This block of codes fetches all the propects
    const users: UserAttributes[] | any = (await Users.findAndCountAll({})) as unknown as UserAttributes;

    if (!users) {
      return response.status(404).json({
        status: `error`,
        message: `Unable to fetch users`,
      });
    }

    return response.status(200).json({
      status: `success`,
      message: `Users found`,
      users,
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${error}`,
    });
  }
};
