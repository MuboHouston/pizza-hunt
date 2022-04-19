const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //this getter transforms the data (changes the date format. Format is in the utils directory) before it gets to the controller. Think of it like middleware
        get: (createdAtVal => dateFormat(createdAtVal))
    },
    size: {
        type: String,
        default: 'Large'
    },
    //empty brackets indicates an array as the data type. You can also specify Array in place of the brackets.
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        //this tells the Mongoose model that it should use the getter function we've specified in the createAt field.
        getters: true
    },
    //we set the id to false because this is a virtual that Mongoose returns, and we don't need it
    id: false
});

//get total count of comments and replies on retrieval. This ia called a virtual
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
})

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;