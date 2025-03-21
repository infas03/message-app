import mongoose from 'mongoose'
import { getTime } from 'date-fns'


const conversationSchema = new mongoose.Schema({
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
		},
	],
	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "messages",
			default: [],
		},
	],
	unreadCounts: {
		type: Map,
		of: Number,
		default: {}
	},
	timestamp: { type: Number, default: () => getTime(new Date())}
},
);

const Conversation = mongoose.model('conversations', conversationSchema)

export default Conversation