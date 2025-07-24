const auth = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  try {
    if (await auth.findOne({ email: req.body.email })) {
      return res.status(401).json({ status: false, error: "Email already exists." });
    }
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const newUser = await auth.create(req.body);
    if (newUser) {
      res.status(201).json({ status: true, message: "User registered successfully." });
    } else {
      res.status(401).json({ status: false, error: "Registration failed." });
    }
  } catch (err) {
    res.status(400).json({ status: false, error: "Something went wrong.", error_data: err });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const currentAuth = await auth.findOne({ email: req.body.email });
    if (!currentAuth) {
      return res.status(401).json({ status: false, error: "User not found." });
    }
    const isMatch = await bcrypt.compare(req.body.password, currentAuth.password);
    if (isMatch) {
      const token = jwt.sign({ id: currentAuth._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
      res.status(201).json({
        status: true,
        message: "Login successful.",
        auth: currentAuth,
        auth_token: token,
      });
    } else {
      res.status(401).json({ status: false, error: "Incorrect password." });
    }
  } catch (err) {
    res.status(400).json({ status: false, error: "Something went wrong.", error_data: err });
  }
};

// View all users
exports.viewAuth = async (req, res) => {
  try {
    const allAuth = await auth.find({});
    if (allAuth) {
      res.status(200).json({ status: true, data: allAuth });
    } else {
      res.status(404).json({ status: false, error: "No users found." });
    }
  } catch (err) {
    res.status(400).json({ status: false, error: "Something went wrong.", error_data: err });
  }
};

// Get profile of logged-in user
exports.getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: false, error: "Token not provided." });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await auth.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ status: false, error: "User not found." });
    }
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    res.status(400).json({ status: false, error: "Invalid token.", error_data: err });
  }
};

// Update profile of logged-in user
exports.updateAuth = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: false, error: "Token not provided." });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 8);
    }
    const updatedUser = await auth.findByIdAndUpdate(decoded.id, updateData, { new: true }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ status: false, error: "User not found." });
    }
    res.status(200).json({ status: true, message: "Profile updated.", data: updatedUser });
  } catch (err) {
    res.status(400).json({ status: false, error: "Invalid token or update failed.", error_data: err });
  }
};
