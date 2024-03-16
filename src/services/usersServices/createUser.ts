import { Response } from 'express';
import { v4 } from 'uuid';
import { generatePassword, generateUserCode, hashPassword } from '../../helperFunctions/helpers';
import { registerUserSchema } from '../../validators/validations';
import Agent, { AgentAttributes } from '../../entities/agentEntity';
import { Locations } from '../../interfaces/locations.interface';
import { sendPasswordMail } from '../../utilities/notification';
import Users, { UserAttributes } from '../../entities/usersEntity';
import SuperAdmin from '../../entities/super-admin-entity';
import { JwtPayload } from 'jsonwebtoken';
import { Stage } from '../../interfaces/stage.interface';
import { Channel, SubChannel } from '../../interfaces/channel.interface';
import { Interest } from '../../interfaces/interest.interface';


export const createProspect = async (request: JwtPayload, response: Response) => {
     try {

      //Fetch the data from the frontend
      const {
        first_name,
        last_name,
        email,
        phone,
        location,
        interest,
        stage,
        sub_channel,
        channel
      } = request.body;

      //Validate the input to ensure the required fields have all been filled out

      const validateInput = await registerUserSchema.validateAsync(request.body);

      if (validateInput.error) {
        return response.status(400).json({
          Error: validateInput.error.details[0].message,
        });
      }


      //This block of codes ensures that the prospect created is not the same as an existing prospect, agent or the superadmin

      const validateEmailAgent = await Agent.findOne({where: {email}})

      const validateEmailUser = await Users.findOne({where: {email}})

      const validateEmailAdmin = await SuperAdmin.findOne({where:{email}})

      if(validateEmailAgent || validateEmailUser || validateEmailAdmin){
        return response.status(400).json({
            status: `error`,
            message: `${email} already in use`,
        })
      }

      //This block of codes fetches the id from the authorisation function to ensure that an agent cannot register a prospect outside of his/her location of coverage
      const userID = request.user.id;
      
      
      const agent = await Agent.findOne({where:{id:userID}}) as unknown as AgentAttributes
      
      if(agent){
        if(agent.location !== location.toLowerCase()){
          return response.status(400).json({
            status: `error`,
            message: `You cannot create a prospect outside your location of coverage. Change your location if you wish to work in this location`
          })
        }
      }
      
      //This block of codes ensures that prospects are not created outside the area of Max's area of coverage
      const locationKey = location.toUpperCase() as keyof typeof Locations;

      const code_location = Locations[locationKey];
    
      if(!code_location){
        return response.status(400).json({
            status: `error`,
            message: `This location does not exist among Max's coverage areas`
        })
      }      


      //generate a new password for the prospect using the last name and some four random numbers, then hash the password for extra security
      
      const newPassword = generatePassword(last_name.toLowerCase())

      const hashedPassword = await hashPassword(newPassword)

      let agent_id = '';

      if(agent){
        agent_id = agent.id
      }else{

        const agentWithLowestProspects = await Agent.findOne({
          where: { location },
          order: [['on_of_prospects', 'ASC']]
        }) as unknown as AgentAttributes;

        if(!agentWithLowestProspects){
          return response.status(404).json({
            status: "error",
            message: "no agent found in this location, please use another location"
          });
        }
        agent_id = agentWithLowestProspects.id

        let new_no_of_prospect = agentWithLowestProspects.on_of_prospects

        new_no_of_prospect = new_no_of_prospect + 1

        await Agent.update({on_of_prospects: new_no_of_prospect},{where: {id:agentWithLowestProspects.id}})
      }

      const allUsers:any = await Users.findAll({where: {location:code_location}}) as unknown as UserAttributes

      let lastUserCode:string = '';
      let newUserCode:string = ''

      
      if(allUsers.length === 0){
        newUserCode = generateUserCode(location, lastUserCode)
      }else{
        let userCodes:number[] = allUsers.map((user:UserAttributes)=> {
           const max_id_number = user.max_id.split('-')[2]
            return Number(max_id_number)
        })
        let sortedUsersCodes:number[] = userCodes.sort((user1:number, user2:number)=> user2 - user1)
        lastUserCode = sortedUsersCodes[0].toString()
        newUserCode = generateUserCode(location, lastUserCode)
      }

      const newUser = await Users.create({
        id: v4(),
        first_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
        location: code_location,
        stage: `${Stage[stage]}`,
        interest: Interest[interest],
        agent_id: agent_id,
        max_id: newUserCode,
        sub_channel: SubChannel[sub_channel],
        channel: Channel[channel]

      }) as unknown as UserAttributes;

      const user = await Users.findOne({where: {id:newUser.id}}) as unknown as UserAttributes;

      if (!user) {
        return response.status(400).json({
          status: "error",
          message: "Something went wrong, try again"
        });
      }

        await sendPasswordMail(email, newPassword)

       const newUserz = delete user.password

      response.status(201).json({
        status: "success",
        message: "Prospect created successfully",
        user,
        newUserz
      });

    } catch (error: any) {
      console.log(error.message)
      return response.status(500).json({
        status: "error",
        message: `Internal Server Error: ${error}`
      });
    }
  }