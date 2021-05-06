const mongoose = require('mongoose');
const itemSchema = require('./itemSchema')
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: lineItemSchema
}, {
    timestamps: true,
    toJSON: { virtuals : ture }
});

lineItemSchema.virtual('extPrice').get(function() {
    //this is bound to the lineItem subdoc
    return this.qty * this.item.price;
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: { virtuals: ture }
});

orderSchema.virtual('orderTotal').get(function() {
    // 'this' is bound to the order doc
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
})

orderSchema.virtual('totalQty').get(function() {
    // 'this' is bound to the order doc
    return this.lineItems.reduce((total, item) => total + item.qty, 0);
})

orderSchema.virtual('orderId').get(function() {
    // 'this' is bound to the order doc
    return this.id.slice(-6).toUpperCase();
})

orderSchema.statics.getCart = function(userId) {
    //'this' is bound to the model
    return this.findOneandUpdate(
        //query
        { user: userId, isPaid: false },
        //update - in the case the order is upserted ()
        { user: userID },
        //upsert option creates the doc it doesnt exist
        { upsert: true, new: true }

    );
};

module.exports = mongoose.model('Order', orderSchema)