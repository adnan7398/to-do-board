const mongoose = require('mongoose');
const  userprofileSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 100 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
    email: { type: String, required: true, unique: true },
})


module.exports = mongoose.model('UserProfile', userprofileSchema);