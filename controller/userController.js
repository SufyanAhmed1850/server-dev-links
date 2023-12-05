import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import decodeJWT from "../utils/decode.js";

const updateUserDetails = async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://devvlinks.vercel.app');
    next();
    try {
        const { firstName, lastName, email } = req.body;
        const decodedToken = await decodeJWT(req, res);
        const foundUser = await User.findById(decodedToken.user._id).exec();
        foundUser.firstName = firstName;
        foundUser.lastName = lastName;
        foundUser.displayEmail = email;
        await foundUser.save();
        return res.status(200).json({
            code: 200,
            message: "Updated successfully",
            user: foundUser,
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
};

const saveUserImg = async (req, res) => {
    try {
        const decodedToken = await decodeJWT(req, res);
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
};

const getUserDetails = async (req, res) => {
    try {
        console.log("GET");
        const decodedToken = await decodeJWT(req, res);
        console.log("decodedToken", decodedToken);
        const foundUser = await User.findById(decodedToken.user._id).exec();
        console.log("foundUser", foundUser);

        return res.status(200).json({
            code: 200,
            message: "Successfull",
            user: foundUser,
            status: true,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ code: 500, message: error.message, status: false });
    }
};

export { updateUserDetails, saveUserImg, getUserDetails };
