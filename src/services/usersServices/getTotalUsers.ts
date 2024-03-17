import { Request, Response } from "express";
import Users, { UserAttributes } from "../../entities/usersEntity";
import { queryFilter } from "../../helperFunctions/helpers";

//==============FUNCTION FOR FETCHING ALL USER/PROSPECT'S PER STAGE===============//

export const getTotalUsersByStages = async (
  request: Request,
  response: Response
) => {
  try {

    //This block of codes setup the query if any
    const query = await queryFilter(request.query || {});

    const finalOutput: Record<string, {} > = {};

    //This block of codes finds users based on stages in the database and query and pushes them into the finalOutput Object
    const stages = [
      "TOP_OF_FUNNEL",
      "READY_FOR_CHECK_IN",
      "CHECKED_IN",
      "TESTED",
      "ISSUED_VERIFICATION_FORM",
      "IN_VERIFICATION",
      "ONBOARDING",
      "AWAITING_ACTIVATION",
    ];

    const users: UserAttributes[] | any = await Users.findAll({ where: query });

    stages.forEach((stage: string) => {
      const stageUsers: UserAttributes[] = users.filter(
        (user: UserAttributes) => user.stage === stage
      );
      finalOutput[stage] = { users: stageUsers, count: stageUsers.length };
    });

    return response.status(200).json({
      status: "success",
      message: `Users fetched successfully by stages`,
      finalOutput,
    });

  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${error}`,
    });
  }
};
