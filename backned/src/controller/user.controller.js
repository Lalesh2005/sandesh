import User from "../models/User.js";

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const users = await User.find({
            $and: [
                {
                    $or: [
                        {
                            username: {
                                $regex: query,
                                $options: "i"
                            }
                        },
                        {
                            name: {
                                $regex: query,
                                $options: "i"
                            }
                        }
                    ]
                },
                {
                    _id: {
                        $ne: req.user.id
                    }
                }
            ]
        }).select("-password");

        return res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};