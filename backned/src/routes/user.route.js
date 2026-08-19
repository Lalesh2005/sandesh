import express from "express";
import { searchUsers } from "../controller/user.controller.js";
import authMiddleware from "../midddleware/authMiddleware.js";

const router = express.Router();

router.get("/search", authMiddleware, searchUsers);

export default router;