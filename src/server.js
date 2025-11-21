import express from 'express';
import userRoute from './users.routes.js';
import mainRoute from './main.routes.js';
import helmet from 'helmet';
const app = express();
const port = 3000;


app.use(express.json());
app.use(helmet());

app.use('v1', mainRoute);
app.use('/v1/user', userRoute);


app.listen(port,()=>{
    console.log(`Server is running on page http://localhost:${port}`)
});