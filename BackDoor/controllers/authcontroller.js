import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Register a new user
export async function register(req, res) {
  try {
    console.log("Received request:", req.body); // Debug log

    const { fullName, email, password, phone, role, specialization, licenseNumber, hospitalClinic } = req.body;

    // Check for missing fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      specialization,
      licenseNumber,
      hospitalClinic,
    });

    // Save user to database
    await newUser.save();
    console.log("User saved:", newUser); // Debug log

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send response with token
    res.status(201).json({ 
      message: "User registered successfully",
      token,
      role: newUser.role 
    });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
}

// Login user
export async function login(req, res) {
  try {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
}
