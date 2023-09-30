import  express  from "express";
import { config } from "dotenv";
// console.log({path: path.resolve('./config/config.env')});
import path from 'path'
config({path: path.resolve('./config/config.env')})

config() // 
const app = express()
const port = process.env.PORT

import { connectionDB } from "./DB/connection.js";
import * as allRouter from './src/Modules/index.routes.js'

app.use(express.json())
connectionDB()


app.use('/user',allRouter.userRouters)
app.use('/msg', allRouter.messageRouter)


app.use('*',(req,res,next)=>
    res.status(404).json({message: '404 Not Found Erorr'})
)
app.get('/', (req,res)=> res.send('Hellow World'))
app.listen(port, () => console.log(`Example app listen on port ${port}!`))

