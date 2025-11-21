import express, { response } from 'express';
import { StatusCodes } from 'http-status-codes';


import userController from './controller/user.controller.js';
import userService from './services/user.service.js';
import {expressYupMiddleware} from 'express-yup-middleware'
import {addUser} from './user.schemas.js';
import {updateUser} from './user.schemas.js';
import {getUser} from './user.schemas.js';
import{removeUser} from './user.schemas.js';
const router = express.Router();


const STATUS = {
    status: 'OK',
    failure: 'NO'
};

router.get('/all',userController.getAllUsers);


router.get('/:id', 
    expressYupMiddleware({schemaValidator: getUser})
    ,userController.getUser);


router.post('/', 
    expressYupMiddleware({ schemaValidator: addUser , StatusCodes: StatusCodes.BAD_REQUEST}),
    userController.addUser
);


router.put('/:id', expressYupMiddleware({
    schemaValidator: updateUser
}),
    userController.updateUser,
);


router.delete('/:id',
    expressYupMiddleware({
        schemaValidator: removeUser
    }),
    userController.removeUser,
);


export default router;
