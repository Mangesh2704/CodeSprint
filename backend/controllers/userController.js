import bcrypt from 'bcrypt'
import { User } from '../models/Schema.js';
const home = async (req,res)=>{
    try{
        res.status(200).send("This is Home Page");
    }catch(error){
        res.status(404).send("Page not found");
    }
}

const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    await newUser.save();
    console.log("User Registered:", newUser)

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Email: ${email} wants to login`)
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export default {login,home,register}