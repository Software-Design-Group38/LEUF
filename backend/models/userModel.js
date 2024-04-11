const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const userInfoSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: Number,
        required: true,
    },
})

const User = mongoose.model('User', userSchema, 'users')
const UserInfo = mongoose.model('UserInfo', userInfoSchema, 'userInfo')

module.exports = { User, UserInfo }