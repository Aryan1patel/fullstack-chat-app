import express from "express"

import { signup, login, logout, updateProfile, checkAuth } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { dexterchat } from "../controller/dexter.controller.js";

const router= express.Router();


router.post("/",dexterchat)




export default router;