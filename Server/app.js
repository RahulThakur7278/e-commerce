import { config } from 'dotenv';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';



const app=express();

config({path:".env"});

app.use(
    cors({
        origin:[],
        methods:['GET','POST','PUT','PATCH','DELETE'],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extends:true}))

export default app;

