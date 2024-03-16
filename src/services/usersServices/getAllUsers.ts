import {Request, Response} from 'express'
import {queryFilter} from '../../helperFunctions/helpers'
import Users, { UserAttributes } from '../../entities/usersEntity';


export const getAllProspectsSorted = async(request:Request, response:Response)=>{

    try {
            const query = await queryFilter(request.query || {});
            const size = Number(request.query.size) || 10;
            const skip = (Number(request.query.page) - 1) * size || 0;

            const users:any = await Users.findAndCountAll({
                where: query,
                order: [['createdAt', 'DESC']],
                limit: size,
                offset: skip
            }) as unknown as UserAttributes;

            if(!users){
                return response.status(404).json({
                    status: `error`,
                    message: `Unable to fetch users`
                })
            }

            return response.status(200).json({
                status: `success`,
                message: `Users found`,
                users
            })

        }catch (error: any) {
        console.log(error.message)
        return response.status(500).json({
          status: "error",
          message: `Internal Server Error: ${error}`
        });
      }
}