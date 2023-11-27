import express from "express";
import checkTokenValidation from "../middleware/checkTokenValidation.js";
import { save } from "../controller/linkController.js";

const SAVE_LINK = express.Router();

SAVE_LINK.route("/save").post(checkTokenValidation, save);

export default SAVE_LINK;
