import express from "express";
import { createChat ,getMyChats} from "../controller/chat.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createChat);
router.get("/",authMiddleware,getMyChats);

export default router;