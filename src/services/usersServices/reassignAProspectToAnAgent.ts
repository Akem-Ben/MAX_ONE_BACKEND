import {Request, Response} from 'express';
import Users, { UserAttributes } from '../../entities/usersEntity';
import Agent, { AgentAttributes } from '../../entities/agentEntity';


export const reassignAProspectToAnAgent = async(request:Request, response:Response) => {
    try{

        const {userId} = request.params

        if(request.query.agent_id){

            const agentId:string | any = request.query.agent_id

            const user = await Users.findOne({where: {id:userId}}) as unknown as UserAttributes

            if(!user){
                return response.status(404).json({
                    status: `error`,
                    message: `User not found`
                })
            }
            
            await Users.update({agent_id:agentId}, {where:{id:userId}}) as unknown as UserAttributes
            
            
            const oldAgent = await Agent.findOne({where: {id:user.agent_id}}) as unknown as AgentAttributes
            
            const newNoOfProspectOldAgent = oldAgent.no_of_prospects - 1
            
            await Agent.update({no_of_prospects:newNoOfProspectOldAgent}, {where:{id:agentId}})
            
            const newAgent = await Agent.findOne({where: {id:agentId}}) as unknown as AgentAttributes

            const newNoOfProspectNewAgent = newAgent.no_of_prospects + 1

            await Agent.update({no_of_prospects:newNoOfProspectNewAgent}, {where:{id:agentId}})


            return response.status(201).json({
                status: `success`,
                message: `User reassigned to ${newAgent.first_name} ${newAgent.last_name}`,
                user
            })

        }

        const user = await Users.findOne({where: {id:userId}}) as unknown as UserAttributes

        const searchLocation: string | any = user.location

        const agentWithLowestProspects = await Agent.findOne({
            where: { location: searchLocation },
            order: [['no_of_prospects', 'ASC']]
          }) as unknown as AgentAttributes;

          let new_agent_id = agentWithLowestProspects.id

          let new_no_of_prospect = agentWithLowestProspects.no_of_prospects + 1
  
          await Agent.update({no_of_prospects: new_no_of_prospect},{where: {id:agentWithLowestProspects.id}})

          await Users.update({agent_id:new_agent_id}, {where:{id:userId}}) as unknown as UserAttributes

          return response.status(201).json({
            status: `success`,
            message: `User reassigned to ${agentWithLowestProspects.first_name} ${agentWithLowestProspects.last_name}`,
            user
        })


    }catch (error: any) {
        console.log(error.message)
        return response.status(500).json({
          status: "error",
          message: `Internal Server Error: ${error}`
        });
      }
    }