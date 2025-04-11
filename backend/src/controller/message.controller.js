import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socket.js';
import Message from '../models/message.model.js';
import User from '../models/user.model.js'


export const getUserFromSidebar = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized user, please login first" });
        }
        const loggedInUserId = req.user._id;

        // Fetch all users except the logged-in user
        let users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // Fetch the latest messages involving the logged-in user
        const latestMessages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId },
            ],
        })
            .sort({ createdAt: -1 }) // Sort messages by latest first
            .limit(50); // Limit to avoid performance issues

        // Map to store latest message timestamps for each user
        const userLastMessageMap = {};
        latestMessages.forEach(msg => {
            const otherUserId = msg.senderId.toString() === loggedInUserId.toString()
                ? msg.receiverId.toString()
                : msg.senderId.toString();
            userLastMessageMap[otherUserId] = msg.createdAt;
        });

        // Fetch unread message count for each user
        const usersWithUnreadCount = await Promise.all(users.map(async (user) => {
            const unreadCount = await Message.countDocuments({
                senderId: user._id,
                receiverId: loggedInUserId,
                isRead: false,
            });
            return {
                ...user.toObject(),
                unreadCount,
                lastMessageAt: userLastMessageMap[user._id.toString()] || 0,
            };
        }));

        // Sort users based on the latest message timestamp (most recent first)
        // usersWithUnreadCount.sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));

        res.status(200).json(usersWithUnreadCount);
    } catch (error) {
        console.error("Error in getUserFromSidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};






export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; // User to chat ID from URL params
        const myId = req.user._id; // Logged-in user's ID

        // Fetch all messages between the logged-in user and the selected user
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        // Mark all unread messages from the selected user as read
        await Message.updateMany(
            { senderId: userToChatId, receiverId: myId, isRead: false },
            { $set: { isRead: true } }
        );

        // Emit an event to update the sidebar only for the logged-in user  // from here we can get the online users
        const mySocketId = getReceiverSocketId(myId);
        if (mySocketId) {
            io.to(mySocketId).emit("updateSidebar");
        }

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            Image: imageUrl,
            isRead: false,
        });
        await newMessage.save();

        // Emit the new message to the receiver
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);

            // Update the sidebar for the receiver only
            io.to(receiverSocketId).emit("updateSidebar");
        }


        const mySocketId = getReceiverSocketId(senderId);
        if (mySocketId) {
            io.to(mySocketId).emit("updateSidebar");
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
