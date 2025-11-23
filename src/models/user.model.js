import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name must be at least 2 characters'],
        maxLength: [20, 'Name must be at most 20 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
    },
    country: {
        type: String,
        maxLength: 30,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;


