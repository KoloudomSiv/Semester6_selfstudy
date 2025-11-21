import * as yup from 'yup';

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


export const getUser = {
        schema: {
        params: {
            yupSchema: yup.object().shape({
                id: yup.number().required(),
            }),
        },
    },
}

export const addUser = {
    schema: {
        body: {
            yupSchema: yup.object().shape({
                name: yup.string(),
                email: yup.string().email(), 
                city: yup.string().required(),
                country: yup.string(),
            }),
        },
    },
};

export const updateUser = {
    schema: {
        params:{
            yupSchema: yup.object().shape({
                id: yup.number().required(),
            }),
        },
        body: {
            yupSchema: yup.object().shape({
                name: yup.string(),
                email: yup.string().email(), 
                city: yup.string(),
                country: yup.string(),
            }),
        },
    },
};

export const removeUser = {
    schema: {
        params: {
            yupSchema: yup.object().shape({
                id: yup.number().required(),
            }),
        },
    },
};