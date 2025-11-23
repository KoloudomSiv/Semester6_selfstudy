import userDao from '../models/persistence/user.dao.js';


const getUser = async (userId) => {
    return await userDao.get(userId);
};

const getAllUsers = async () => {
    return await userDao.getAll();
};

const updateUser = async (userId, details) => {
    return await userDao.update(userId, details);
};

const addUser = async (details) => {
    return await userDao.insert(details);
};

const removeUser = async (userId) => {
    return await userDao.remove(userId);
};

export default {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    removeUser,
};