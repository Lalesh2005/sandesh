import express from "express";
import {sendMessage,getMessages} from "../controller/message.controller.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/",authMiddleware,sendMessage);
router.get("/:chatId/messages", authMiddleware, getMessages);
export default router;

