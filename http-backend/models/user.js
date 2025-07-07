const mongoose = require('mongoose');
const  userprofileSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 100 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['Todo', 'In Progress', 'Done'],
      default: 'Todo'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    }
  }, { timestamps: true });

module.exports
module.exports = mongoose.model('UserProfile', userprofileSchema);