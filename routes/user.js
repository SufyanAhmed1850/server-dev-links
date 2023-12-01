import express from "express";
import { update } from "../controller/userController.js";   
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../schema/userSchema.js";
import fs from "fs";
import multer from "multer";

const USER = express.Router();

USER.post("/", update);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

USER.post("/image", upload.single("file"), async (req, res) => {
    try {
        const authorization = req.headers["authorization"];
        const token = authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken);
        const foundUser = await User.findById(decodedToken.user._id).exec();
        console.log("foundUser", foundUser);
        const options = {
            public_id: foundUser._id,
            unique_filename: false,
            overwrite: true,
        };
        const result = await cloudinary.uploader.upload(req.file.path, options);
        fs.unlinkSync(req.file.path);
        foundUser.profile = result.secure_url;
        await foundUser.save();
        return res.status(200).json({
            code: 200,
            message: "Image successfully saved",
            url: result.secure_url,
            name: result.public_id,
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
});

export default USER;
