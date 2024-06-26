const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');
const authMiddleware = require('../Middleware/AuthMiddleware');
require("dotenv").config();
const userRouter = express.Router();

// Registration
userRouter.post("/register", async(req,res) =>{
    try {
        const {name, mobile, email, password, role, status} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({name, mobile, email, password:hashedPassword, role, status });
        res.status(201).json({ message: 'User registered successfully', user });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

// Login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Change-password
userRouter.post("/change-password", authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        // Debugging log
        console.log(`User ID from token: ${req.userId}`);
        
        // Find the user by ID from the authenticated request
        const user = await UserModel.findByPk(req.userId);
        if (!user) {
            console.log('User not found in the database'); // Debugging log
            return res.status(401).send({ message: 'User not found' });
        }

        // Validate the current password
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).send({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = userRouter;