import express from "express";
import REGISTRATION from "./authentication/registrationRoutes.js";
import AUTH from "./authentication/authRoutes.js";
import SAVE_LINK from "./saveLink.js";

const router = express.Router();

router.use("/signup", REGISTRATION);
router.use("/login", AUTH);
router.use("/link", SAVE_LINK);

export default router;
