const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        // resetTokken: String,
        // resetTokkenExpiration: Date,
        cart: {
            items: [
                {
                    productId: {
                        type: Schema.Types.ObjectId,
                        ref: "Product",
                        required: true,
                    },
                    quantity: {
                        type: Number,
                    },
                },
            ],
            cartPrice: {
                type: Number,
                default: 0,
            },
        },
    },
    { timestamps: true },
);

UserSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    let updatedCartPrice = this.cart.cartPrice + product.price;
    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({ productId: product._id, quantity: newQuantity });
    }

    const updatedCart = { items: updatedCartItems, cartPrice: updatedCartPrice };
    this.cart = updatedCart;
    return this.save();
};

UserSchema.methods.removeFromCart = function (product) {
    let updatedCartPrice = this.cart.cartPrice;
    const cartProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === product._id.toString();
    });
    if (cartProductIndex >= 0) {
        updatedCartPrice = updatedCartPrice - product.price * this.cart.items[cartProductIndex].quantity;
    }

    const updatedCartItems = this.cart.items.filter((item) => {
        return item.productId.toString() !== product._id.toString();
    });

    const updatedCart = { items: updatedCartItems, cartPrice: updatedCartPrice };
    this.cart = updatedCart;
    return this.save();
};

UserSchema.methods.clearCart = function () {
    this.cart = { items: [], cartPrice: 0 };
    return this.save();
};

module.exports = mongoose.model("User", UserSchema);
