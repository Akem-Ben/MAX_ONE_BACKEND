import express from 'express';
import dotenv from 'dotenv';
import { database } from './configurations';
import {HttpError} from 'http-errors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import superAdminRoute from './routes/super-admin.routes'

const app = express()

dotenv.config()


app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.use('superAdmin', superAdminRoute)


database.initialize().then( ()=>{
    console.log("Database is connected");
}).catch((err:HttpError)=>{
    console.log(err);
})


app.listen(process.env.Port, ()=>{
    console.log(`server running on port ${process.env.Port}`)
})

