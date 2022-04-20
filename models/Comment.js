const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//creating replies as a subdocument array for comments since we'll never query for just reply data
const ReplySchema = new Schema({
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String,
        required: true,
        trim: true
    },
    writtenBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtval => dateFormat(createdAtval)
    }
},
{
    toJSON: {
        getter: true
    }
})

const CommentSchema = new Schema({
    writtenBy: {
        type: String,
        required: true
    },
    commentBody: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtval => dateFormat(createdAtval)
    },
    //use ReplySchema to validate data for a reply
    replies: [ReplySchema]
},
{
    toJSON: {
        virtuals: true,
        getter: true
    },
    id: false
})

//gets total count of replies
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment