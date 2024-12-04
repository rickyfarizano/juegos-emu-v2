// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
<<<<<<< HEAD
    enum: ['user', 'admin-game', 'admin-dev', 'super-admin'],
=======
    enum: ['user', 'admin', 'super-admin', 'admin-dev', 'admin-game'],
>>>>>>> 7365b7669a0362358a77d4fe1e3d9392670d0c5c
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
