import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true, // Store email in lowercase
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], // Validate email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
  name: {
    type: String,
    required: true,
    minlength: 3, // Minimum length for name
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // You can extend this with other roles if needed
    default: 'user', // Default role is 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation time
  },
});

const User = model('User', userSchema);
export { User}