import Chat from "../models/chat.js";
import Message from "../models/message.js";

export const createChat = async (req, res) => {
    try {
        const { userId } = req.body;
        const currentUserId = req.user.id;

        // Validation
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        // User cannot chat with himself
        if (currentUserId === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot create chat with yourself"
            });
        }

        // Check existing chat
        const existingChat = await Chat.findOne({
            participants: {
                $all: [currentUserId, userId]
            },
            isGroupChat: false
        });

        if (existingChat) {
            return res.status(200).json({
                success: true,
                message: "Chat already exists",
                chat: existingChat
            });
        }

        // Create new chat
        const newChat = await Chat.create({
            participants: [currentUserId, userId]
        });

        return res.status(201).json({
            success: true,
            message: "Chat created successfully",
            chat: newChat
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyChats = async(req,res)=>{
    try{
        const currentUserId = req.user.id;
        const chats = await Chat.find({
            participants: currentUserId
        })
        .populate("participants","name username avatar isOnline")
        .populate("lastMessage")
        .sort({ updatedAt: -1 })

        return res.status(200).json({
            success:true,
            chats
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}