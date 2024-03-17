import express from 'express';
import dotenv from 'dotenv';
import { database } from './configurations';
import {HttpError} from 'http-errors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import superAdminRoutes from './routes/superAdminRoutes/super-admin.routes'
import agentRoutes from './routes/agentRoutes/agent.routes'
import userRoutes from './routes/userRoutes/user.routes'


const app = express()

dotenv.config()

//Middlewares
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(cors())


//Routes
app.use('/superAdmin', superAdminRoutes)
app.use('/agent', agentRoutes)
app.use('/users', userRoutes)


//Database connection
database.sync({}).then( ()=>{
    console.log("Database is connected");
}).catch((err:HttpError)=>{
    console.log(err);
})


//Server
app.listen(process.env.Port, ()=>{
    console.log(`server running on port ${process.env.Port}`)
})

