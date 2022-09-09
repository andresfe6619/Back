import  mongoose from 'mongoose';

export const usersSchema = mongoose.model('users', {
    username : {type: String, required: true},
    password : {type: String, required: true},
    email : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
});