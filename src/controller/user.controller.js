
import userService from "../services/user.service.js" ;
import {StatusCodes} from 'http-status-codes';
import pino from 'pino';
const STATUS = {
    status: 'OK',
    failure: 'NO'
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        if (users && users.length > 0) {
            return res.status(StatusCodes.OK).send(users);
        }
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: 'No users found',
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: STATUS.failure,
            message: error.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.getUser(id);
        pino().info(`Fetching user`);
        if (user) {
            return res.status(StatusCodes.OK).send({
                status: STATUS.status,
                user,
            });
        }
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `User ${id} is not found`,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: STATUS.failure,
            message: error.message,
        });
    }
};

const addUser = async (req, res) => {
    try {
        const { body: user } = req;
        const addeduser = await userService.addUser(user);
        return res.status(StatusCodes.CREATED).send({
            status: STATUS.status,
            user: addeduser,
        });
    } catch (error) {
        pino().error(`Error adding user: ${error.message}`);
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: STATUS.failure,
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { body: user } = req;
        const id = req.params.id;
        
        if (!id || id === 'undefined') {
            return res.status(StatusCodes.BAD_REQUEST).send({
                status: STATUS.failure,
                message: 'User ID is required',
            });
        }
        
        const updatedUser = await userService.updateUser(id, user);
        if (updatedUser) {
            return res.status(StatusCodes.OK).send({
                status: STATUS.status,
                user: updatedUser,
            });
        } else {
            return res.status(StatusCodes.NOT_FOUND).send({
                status: STATUS.failure,
                message: `User "${id}" is not found`,
            });
        }
    } catch (error) {
        pino().error(`Error updating user: ${error.message}`);
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: STATUS.failure,
            message: error.message,
        });
    }
};

const removeUser = async (req, res) => {
    try {
        const { params } = req;
        const id = params.id;
        const user = await userService.getUser(id);
        if (user) {
            await userService.removeUser(id);
            return res.status(StatusCodes.OK).send({
                status: STATUS.status,
                message: `User ${id} deleted successfully`,
            });
        } else {
            return res.status(StatusCodes.NOT_FOUND).send({
                status: STATUS.failure,
                message: `User ${id} not found, user not been deleted`,
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: STATUS.failure,
            message: error.message,
        });
    }
};

export default{
    updateUser,
    addUser,
    getAllUsers,
    getUser,
    removeUser
}
