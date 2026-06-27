import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists const existingUser = await User.findOne({ email });
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password : hashedPassword,
    });

    const token = generateToken(user._id);
     res.status(201).json({
     success: true,
     message: "User registered successfully",
     token,
     });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//LOGIN USER

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
   const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
    success: true,
    message: "Login successful",
    token,
  });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};