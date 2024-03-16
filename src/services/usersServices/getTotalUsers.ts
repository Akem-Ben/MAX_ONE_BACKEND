import { Request, Response } from "express";
import Users, { UserAttributes } from "../../entities/usersEntity";
import { queryFilter } from "../../helperFunctions/helpers";

export const getTotalUsersByStages = async (
  request: Request,
  response: Response
) => {
  try {
    const query = await queryFilter(request.query || {});

    const finalOutput: Record<string, any> = {};

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

    const users: any = await Users.findAll({ where: query });

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
