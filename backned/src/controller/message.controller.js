import Chat from "../models/chat.js";
import Message from "../models/message.js";
import { getIO } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { chatId, content } = req.body;

        // 1. Validation
        if (!chatId || !content) {
            return res.status(400).json({
                success: false,
                message: "ChatId and content are required"
            });
        }

        // 2. Check chat exists
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        // 3. Create message
        const newMessage = await Message.create({
            chat: chatId,
            sender: senderId,
            content
        });

        // 4. Update last message
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: newMessage._id
        });

        // 5. Populate sender
        const message = await Message.findById(newMessage._id)
            .populate("sender", "name username avatar");

        const io = getIO();

        io.to(chatId).emit(
            "receive-message",
            message
        );

        return res.status(201).json({
            success: true,
            message
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;

        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "Invalid chat id"
            });
        }

        const ischat = await Chat.findById(chatId);

        if (!ischat) {
            return res.status(404).json({
                success: false,
                message: "Chat does not exist"
            });
        }

        const messages = await Message.find({
            chat: chatId
        })
            .populate("sender", "name username avatar");

        return res.status(200).json({
            success: true,
            messages
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};