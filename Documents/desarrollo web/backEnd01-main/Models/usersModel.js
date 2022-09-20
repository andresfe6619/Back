import  mongoose from 'mongoose';

export const usersSchema = mongoose.model('users', {
    username : {type: String, required: true},
    password : {type: String, required: true},
    email : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    Age: {type: Number, required: true },
    phone: {type: Number, required: true},
    avatar: {type: String, required: true}
});