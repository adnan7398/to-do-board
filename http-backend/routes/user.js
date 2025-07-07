import express from "express";
const userRouter = express.Router();
import { z } from "zod";
import UserProfile from "../models/user.js"; // Adjust the path as necessary
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

userRouter.post("/signup", async function (req, res) {
    const requirebody = z.object({
        email: z.string().min(3).max(50).email(),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(2).max(20),
        password: z.string().min(8).max(20).refine((password) => {
            const uppercase = /[A-Z]/.test(password);
            const lowercase = /[a-z]/.test(password);
            const specialchar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            return uppercase && lowercase && specialchar;
        }, {
            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one special character."
        })
    });
    const parsedata = requirebody.safeParse(req.body);
    if (!parsedata.success) {
        res.json({
            message: "incorrect detail",
            error: parsedata.error
        })
        return
    }
    const email = req.body.email;
    const password = req.body.password;
    const firstName = reqcons.body.firstName;
    const lastName = req.body.lastName;
    let errorthrown = false;
    try {
        const hashpassword = await bcrypt.hash(password, 5);
        //const profileImage = req.file ? /uploads/${ req.file.filename }: null;
        await UserProfile.create({
            email: email,
            password: hashpassword,
            firstName: firstName,
            lastName: lastName,
        })
    } catch (e) {
        res.status(403).json({
            error: e.message
        })
        errorthrown = true
    }
    if (!errorthrown) {
        res.json({
            message: "You Are successfuly signed up"
        })
    }
});
export default userRouter;