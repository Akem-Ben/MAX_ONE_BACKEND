import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { generateAgentCode, generateAgentPassword, hashPassword } from '../../helperFunctions/helpers';
import { registerAgentSchema } from '../../validators/validations';
import Agent, { AgentAttributes } from '../../entities/agentEntity';


export const createAgent = async (request: Request, response: Response) => {
     try {
      const {
        first_name,
        last_name,
        email,
        phone,
        location,
      } = request.body;

      const validateInput = await registerAgentSchema.validateAsync(request.body);

      if (validateInput.error) {
        console.log("error", validateInput);
        return response.status(400).json({
          Error: validateInput.error.details[0].message,
        });
      }

      
      const newPassword = generateAgentPassword(last_name.toLowerCase())

      const hashedPassword = await hashPassword(newPassword)

      const allagents = await Agent.findAll({where: {location}})

      let lastAgentCode:string = '';
      let newAgentCode:string = ''

      if(allagents.length === 0){
        newAgentCode = generateAgentCode(location, lastAgentCode)
      }else{
        let sortedAgents:any = allagents.sort((a:any, b:any)=> Number(b.code.slice(-4)) - Number(a.code.slice(-4)))
        lastAgentCode = sortedAgents[0].toString()
        newAgentCode = generateAgentCode(location, lastAgentCode)
      }

      const newAgent = await Agent.create({
        id: v4(),
        first_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
        location,
        code: newAgentCode
      }) as unknown as AgentAttributes;

      const newAgentInstance = await Agent.findOne({where: {id:newAgent.id}});

      if (!newAgentInstance) {
        return response.status(400).json({
          status: "error",
          message: "Something went wrong, try again"
        });
      }

      response.status(200).json({
        status: "success",
        message: "Agent created successfully",
        newAgentInstance
      });

    } catch (error: any) {
      return response.status(500).json({
        status: "error",
        message: `Internal Server Error: ${error}`
      });
    }
  }