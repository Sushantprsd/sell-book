const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            index: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        sellingType: {
            type: String,
            enum: ["rent", "sell"],
            required: true,
            index: true,
        },
        tags: [
            {
                type: String,
                required: true,
                index: true,
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
