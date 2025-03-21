import mongoose from 'mongoose'
import { getTime } from 'date-fns'


const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId },
  receiverId: { type: mongoose.Schema.Types.ObjectId },
  message: { type: String },
  isRead: { type: Boolean, default: false },
  timestamp: { type: Number, default: () => getTime(new Date()) }
});



const Message = mongoose.model('messages', messageSchema)

export default Message;