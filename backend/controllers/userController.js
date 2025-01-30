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
        console.log(`${existingUser.email} alreadt exists`)
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
  console.log(`Email: ${email} wants to login`);
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`${email} not found for logging in`);
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Wrong password for ${user.email}`);
      return res.status(400).json({ message: 'Invalid password' });
    }

    console.log(`Login successful for ${user.email}`);

    // Store user info in session
    req.session.user = {
      _id: user._id,
      email: user.email,
    };

    res.status(200).json({ message: 'Login successful' , data: req.session.user});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};


const getSession = (req, res) => {
    res.send(req.session)
}

export default {login,home,register, getSession, logout}