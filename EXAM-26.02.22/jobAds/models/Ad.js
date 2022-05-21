const { Schema, model, Types: { ObjectId } } = require('mongoose');


const adSchema = new Schema({

    headline: { type: String, minlength: [4, 'Headline must be at least 4 characters long'] },
    location: { type: String, minlength: [8, 'Location must be at least 8 characters long'] },
    name: { type: String, minlength: [3, 'Company name must be at least 8 characters long'] },
    description: { type: String, maxlength: [40, 'Description must be at most 40 characters long'] },
    owner: { type: ObjectId, ref: 'User', required: true},
    workers: { type: [ObjectId], ref: 'User', default: [] },
    //rating: { type: Number, default: 0}

});

const Ad = model('Post', adSchema);

module.exports = Ad;