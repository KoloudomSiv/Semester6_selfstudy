import User from '../user.model.js';
import mongoose from 'mongoose';

const get = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID format');
        }
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

const getAll = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error(`Error fetching all users: ${error.message}`);
    }
};

const update = async (userId, newDetails) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID format');
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            newDetails,
            { new: true, runValidators: true }
        );
        return updatedUser;
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message).join(', ');
            throw new Error(`Validation error: ${messages}`);
        }
        throw new Error(`Error updating user: ${error.message}`);
    }
};

const insert = async (details) => {
    try {
        const newUser = new User(details);
        await newUser.save();
        return newUser;
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message).join(', ');
            throw new Error(`Validation error: ${messages}`);
        }
        if (error.code === 11000) {
            throw new Error('Email already exists');
        }
        throw new Error(`Error creating user: ${error.message}`);
    }
};

const remove = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID format');
        }
        const result = await User.findByIdAndDelete(userId);
        return result !== null;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

export default {
    get,
    getAll,
    update,
    remove,
    insert,
};