import express from 'express'
const router = express.Router()
import { msg } from '../../messages.js'
import User from '../../models/userModel.js'
import Message from '../../models/messageModel.js'
import Conversation from '../../models/conversationModel.js'
import { getReceiverSocketId, io } from '../../socket/socket.js'


router.get('/get/:id', async (req, res) => {

    try {

        const { id: userToChatId } = req.params;
        const senderId = res.locals.currentId;

        console.log("senderId" + senderId)
        
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages")

        if (!conversation) return res.status(200).json({ messages: [] });

        const messages = conversation.messages;
   

        res.status(200).json({ messages: messages });
    } catch (err) {
        res.status(500).json({ errorMsg: msg.messageFail });
    }
});

router.get('/getall', async (req, res) => {

    try {

        const senderId = res.locals.currentId;

        const conversation = await Conversation.findOne({
            participants: senderId
        }).populate("messages")

        if (!conversation) return res.status(200).json({ messages: [] });

        const messages = conversation.messages;

        res.status(200).json({ messages: messages });
    } catch (err) {
        res.status(500).json({ errorMsg: msg.messageFail });
    }
});



router.post('/send/:id', async (req, res) => {


console.log('send msg')
    try {

        console.log(res.locals.currentId);

        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = res.locals.currentId;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

         if (!conversation.unreadCounts) {
            conversation.unreadCounts = new Map();
        }

        const currentUnreadCount = conversation.unreadCounts.get(receiverId) || 0;
        conversation.unreadCounts.set(receiverId, currentUnreadCount + 1);

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            console.log("online")
            io.emit("newMessage", newMessage);

        } 
        else {
          console.log('Create a notification if the receiver is not online')

          let link = ''
    
          if (res.locals.role == 'candidate') {
            link = '/employer/messages'
          } else {
            link = '/profile/messages'
          }
    
          const notification = new Notification({
            receiverId: receiverId,
            senderId: senderId,
            message: `You have received a new Message`,
            type: 'message',
            senderRole: res.locals.role,
            link: link
          })
          await notification.save()
        }

        console.log(newMessage)

        res.status(200).json(newMessage)
    } catch (err) {
        console.log(err)
        res.status(500).json({ errorMsg: msg.messageFail });
    }
});

router.patch('/markAsRead/:senderId', async (req, res) => {
    try {
        const { senderId } = req.params;
        const receiverId = res.locals.currentId;

        console.log("mark as read")

        console.log(senderId)
        console.log(receiverId);

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            return res.status(500).json({ errorMsg: msg.dataError});
        }

        await Message.updateMany(
            { _id: { $in: conversation.messages }, receiverId, isRead: false },
            { isRead: true }
        );

        conversation.unreadCounts.set(receiverId, 0);
        await conversation.save();

        await Notification.updateMany(
            { senderId, receiverId, type: 'message', isRead: false },
            { isRead: true }
        );

        res.status(200).json({ message: "Messages marked as read" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: "Failed to mark messages as read" });
    }
});

router.post('/addtoconversation/:id', async (req, res) => {

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = res.locals.employerId;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {

            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        res.status(200).json({ successMsg: "Added" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: "Failed to send message." });
    }
});

router.get('/getusersforsidebar', async (req, res) => {

    try {
        // const senderId = res.locals.currentId;
        const senderId = req.query.currentId;
        console.log("senderId: ", senderId)
        
        // const conversations = await Conversation.find({
        //     participants: senderId
        // });

        const conversations = await Conversation.find();

        console.log("conversations: ", conversations);

        const participantIds = new Set();
        conversations.forEach(conversation => {
            conversation.participants.forEach(participant => {
                participantIds.add(participant.toString());
            });
        });

        participantIds.delete(senderId.toString());
        let allUsers = [];

         allUsers = await User.find({ _id: { $in: Array.from(participantIds) } });

         const usersWithUnreadCounts = allUsers.map(user => {
            const userId = user._id.toString();
            const conversation = conversations.find(conv => conv.participants.includes(userId));
            const unreadCount = conversation ? (conversation.unreadCounts.get(senderId.toString()) || 0) : 0;
            return {
                ...user.toObject(),
                unreadCount: unreadCount
            };
        });

        res.status(200).json({ allUsers: usersWithUnreadCounts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ errorMsg: "Failed to retrieve users." });
    }
});

export default function (app) {
    app.use('/api/message', router)
}