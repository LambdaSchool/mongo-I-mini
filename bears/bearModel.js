// create a model for our bears.
const mongoose = require('mongoose');

// Schema
// {
//     species: 'Grizzly Bear',
//     latinName: 'Ursus arctos horribilis',
//     createOn: Date.now();
// }

const BearSchema = new mongoose.Schema({
    // declare a schema. Your documents will 'look like this'
    species: {
        type: String,  // There are many types in Mongoose 
        required: true,  // required is a validator. It tells us that this field is required
        unique: true   // unique is also a validator. It tells us this field can only exist once
    },
    latinName: {
        type: String,
        required: true
    },
    createOn: {
        type: Date,   // Date is a nother type in Mongoose.
        default: Date.now()
    }
});

const bearsModel = mongoose.model('Bear', BearSchema);   // this is where we declare this as a model.
// by passing our BearSchema to this model we decalre that it will be a collection in our DB

module.exports = bearsModel;