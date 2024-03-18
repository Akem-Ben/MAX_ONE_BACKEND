import { Request, Response } from "express";
import { queryFilter } from "../../helperFunctions/helpers";
import Users, { UserAttributes } from "../../entities/usersEntity";

//==============FUNCTION FOR FETCHING ALL USER/PROSPECT'S IN A SORTED FASHION===============//

export const getAllProspectsSorted = async (
  request: Request,
  response: Response
) => {
  try {

    //This block of codes sets the query (if available) and pagination keys
    const query = await queryFilter(request.query || {});
    const size = Number(request.query.size) || 10;
    const skip = (Number(request.query.page) - 1) * size || 0;

    //This block of codes fetches the propects in descending order of date created and date updated
    const users: UserAttributes[] | any = (await Users.findAndCountAll({
      where: query,
      order: [["createdAt", "DESC"], ["updatedAt", "DESC"]],
      limit: size,
      offset: skip,
    })) as unknown as UserAttributes;

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
