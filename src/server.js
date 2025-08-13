import express from 'express';
import { StatusCodes } from 'http-status-codes';
const app = express();
const port = 3000;
//localhost:3000
app.get('/hello', (req,res)=>{
    res.status(StatusCodes.CREATED); //hhtp status code 201
    res.send('Hello bitch!!');
})
app.listen(port,()=>{
    console.log(`Server is running on page http://localhost:${port}`)
})