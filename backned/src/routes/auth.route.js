import express from "express";
import {registerUser,loginUser,getProfile} from "../controller/auth.controller.js";
import authMiddleware from "../midddleware/authMiddleware.js";

const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authMiddleware,getProfile);
export default router;

