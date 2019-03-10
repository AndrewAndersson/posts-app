const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userScema = mongoose.Schema({
   email: { type: String, required: true, unique: true },
   pasword: { type: String, required: true }
});

userScema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userScema);