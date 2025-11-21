import express from 'express';
const router = express.Router();
//localhost:3000
router.get('/hello', (req,res)=>{
    res.status(StatusCodes.CREATED); //hhtp status code 201
    res.send('Hello bitchsss!!');
});
export default router;