const { Schema, model } = require("mongoose");
const formatDate = require("../utils/formatDate")

const ThoughtSchema =
new Schema(
    {
        thoughtText: {
            type: String,
            required: "Thought is required",
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => formatDate(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions:[ReactSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const ReactSchema = new Schema(
    {
     reactionId: {
        type: Schema.Types.ObjectId(),
     },
     reactionBody: 
     {
        type: String,
        required: true,
        maxlength: 280,
     },
     username:
     {
        type: String,
        required: true,
     },
     createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatDate(timestamp),
     },
    },
    {
        toJSON: {
            getters:true,
        },
        id: false,
    }
);

ThoughtSchema.virtual("reactionCount").get(function () { return this.reactions.length;
});

const Thought= model("Thought", ThoughtSchema)

module.exports = Thought;