import * as yup from 'yup';
import mongoose from 'mongoose';

const MINIMUM_LENGTH = {
    name: 2,
    city:1,
    country:2,
};

const MAXIMUM_LENGTH = {
    name: 20,
    city:30,
    country:30,
};

// Custom validation for MongoDB ObjectId
const objectIdSchema = yup.string()
    .required('ID is required')
    .test('is-objectid', 'Invalid user ID format', (value) => {
        return mongoose.Types.ObjectId.isValid(value);
    });

export const getUser = {
        schema: {
        params: {
            yupSchema: yup.object().shape({
                id: objectIdSchema,
            }),
        },
    },
}

export const addUser = {
    schema: {
        body: {
            yupSchema: yup.object().shape({
                name: yup.string().min(MINIMUM_LENGTH.name, `Name must be at least ${MINIMUM_LENGTH.name} characters`).max(MAXIMUM_LENGTH.name, `Name must be at most ${MAXIMUM_LENGTH.name} characters`),
                email: yup.string().email('Invalid email format').required('Email is required'), 
                city: yup.string().min(MINIMUM_LENGTH.city, `City must be at least ${MINIMUM_LENGTH.city} character`).max(MAXIMUM_LENGTH.city, `City must be at most ${MAXIMUM_LENGTH.city} characters`).required('City is required'),
                country: yup.string().min(MINIMUM_LENGTH.country, `Country must be at least ${MINIMUM_LENGTH.country} characters`).max(MAXIMUM_LENGTH.country, `Country must be at most ${MAXIMUM_LENGTH.country} characters`),
            }),
        },
    },
};

export const updateUser = {
    schema: {
        params:{
            yupSchema: yup.object().shape({
                id: objectIdSchema,
            }),
        },
        body: {
            yupSchema: yup.object().shape({
                name: yup.string().min(MINIMUM_LENGTH.name, `Name must be at least ${MINIMUM_LENGTH.name} characters`).max(MAXIMUM_LENGTH.name, `Name must be at most ${MAXIMUM_LENGTH.name} characters`),
                email: yup.string().email('Invalid email format'), 
                city: yup.string().min(MINIMUM_LENGTH.city, `City must be at least ${MINIMUM_LENGTH.city} character`).max(MAXIMUM_LENGTH.city, `City must be at most ${MAXIMUM_LENGTH.city} characters`),
                country: yup.string().min(MINIMUM_LENGTH.country, `Country must be at least ${MINIMUM_LENGTH.country} characters`).max(MAXIMUM_LENGTH.country, `Country must be at most ${MAXIMUM_LENGTH.country} characters`),
            }),
        },
    },
};

export const removeUser = {
    schema: {
        params: {
            yupSchema: yup.object().shape({
                id: objectIdSchema,
            }),
        },
    },
};