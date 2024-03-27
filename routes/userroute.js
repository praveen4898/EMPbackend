const express = require("express");
const bcyrpt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/usermodel");


userRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).send({ error: 'Passwords do not match' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        const hashedPassword = await bcyrpt.hash(password, 10);
        const user = new UserModel({ email, password: hashedPassword });
        await user.save();
        
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcyrpt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({userID:user._id,author:user.username}, "masai");
        res.send({ msg: "user logged in successfully", token });
      } else {
        res.send({ msg: "invalid user" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  userRouter
};
