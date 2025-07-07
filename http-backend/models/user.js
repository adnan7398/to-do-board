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
  const actionLogSchema = new mongoose.Schema({
    actionType: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    description: String,
    timestamp: { type: Date, default: Date.now }
  });
  
  const conflictSchema = new mongoose.Schema({
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    usersInvolved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
    details: String,
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model('Conflict', conflictSchema);
module.exports = mongoose.model('ActionLog', actionLogSchema);
module.exports = mongoose.model('Task', taskSchema);
module.exports = mongoose.model('UserProfile', userprofileSchema);