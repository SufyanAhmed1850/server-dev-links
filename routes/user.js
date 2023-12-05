import express from "express";
import {
    updateUserDetails,
    saveUserImg,
    getUserDetails,
} from "../controller/userController.js";
import upload from "../utils/multer.js";

const USER = express.Router();

USER.get("/", getUserDetails);
USER.post("/update-user", updateUserDetails);

// Use middleware to set CORS headers for the "/image" route
USER.post("/image", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://devvlinks.vercel.app');
    next();
}, upload.single("file"), saveUserImg);

export default USER;
