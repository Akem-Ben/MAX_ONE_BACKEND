import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { generateAgentCode, generatePassword, hashPassword } from '../../helperFunctions/helpers';
import { registerAgentSchema } from '../../validators/validations';
import Agent, { AgentAttributes } from '../../entities/agentEntity';
import { Locations } from '../../interfaces/locations.interface';
import { sendPasswordMail } from '../../utilities/notification';


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
        return response.status(400).json({
          Error: validateInput.error.details[0].message,
        });
      }

      const validateEmail = await Agent.findOne({where: {email}})

      if(validateEmail){
        return response.status(400).json({
            status: `error`,
            message: `${email} already in use`,
        })
      }

      const locationKey = location.toUpperCase() as keyof typeof Locations;
      const code_location = Locations[locationKey];
    
      if(!code_location){
        return response.status(400).json({
            status: `error`,
            message: `This location does not exist among Max coverage areas`
        })
      }

      
      
      const newPassword = generatePassword(last_name.toLowerCase())

      const hashedPassword = await hashPassword(newPassword)

      const allagents:any = await Agent.findAll({where: {location:code_location}}) as unknown as AgentAttributes

      let lastAgentCode:string = '';
      let newAgentCode:string = ''

      
      if(allagents.length === 0){
        newAgentCode = generateAgentCode(location, lastAgentCode)
      }else{
        let agentsCodes:number[] = allagents.map((a:AgentAttributes)=> {
           const max_id_number = a.agent_max_id.split('-')[3]
            return Number(max_id_number)
        })
        let sortedAgentsCodes:number[] = agentsCodes.sort((agent1:number, agent2:number)=> agent2 - agent1)
        lastAgentCode = sortedAgentsCodes[0].toString()
        newAgentCode = generateAgentCode(location, lastAgentCode)
      }

      const newAgent = await Agent.create({
        id: v4(),
        first_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
        location: code_location,
        agent_max_id: newAgentCode,
        on_of_prospects: 0
      }) as unknown as AgentAttributes;

      const newAgentInstance = await Agent.findOne({where: {id:newAgent.id}});

      if (!newAgentInstance) {
        return response.status(400).json({
          status: "error",
          message: "Something went wrong, try again"
        });
      }

        await sendPasswordMail(email, newPassword)

      response.status(201).json({
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