import express from "express";
import { searchUsers } from "../controller/user.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", authMiddleware, searchUsers);

export default router;