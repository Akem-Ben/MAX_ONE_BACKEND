import { Request, Response } from "express";
import { loginSchema } from "../../validators/validations";
import bcrypt from "bcryptjs";
import { generateToken } from "../../helperFunctions/helpers";
import Agent, { AgentAttributes } from "../../entities/agentEntity";

export const loginAgent = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const validateInput = await loginSchema.validateAsync(request.body);

    if (validateInput.error) {
      return response.status(400).json({
        Error: validateInput.error.details[0].message,
      });
    }

    const agent = (await Agent.findOne({
      where: { email: email },
    })) as unknown as AgentAttributes;

    if (!agent) {
      return response.status(404).json({
        message: `agent does not exist`,
      });
    }
    const validatePassword = await bcrypt.compare(password, agent.password);

    if (!validatePassword) {
      return response.status(401).send({
        status: "error",
        message: "Password is Incorect",
      });
    }

    const tokenData = {
      id: agent.id,
      email: agent.email,
    };
    const token = await generateToken(tokenData);

    return response.status(200).json({
      status: "success",
      message: "Login Successful",
      agent,
      token,
    });
  } catch (error: any) {
    return response.status(500).json({
      status: `error`,
      message: `Internal Server Error`,
    });
  }
};
