import mongoose, { Schema, model } from "mongoose";

const linkSchema = new Schema(
    {
        order: {
            type: Schema.Types.Mixed,
            required: true,
        },
        platform: {
            text: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                required: true,
            },
            backgroundColor: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: true,
            },
        },
        link: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

// Ensure that each user can only have a unique order
linkSchema.index({ user: 1, order: 1 }, { unique: true });

const Link = model("Link", linkSchema);

export default Link;
