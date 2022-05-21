const { Schema, model, Types: { ObjectId } } = require('mongoose');

// TODO: change user model according to exam description
// TODO: add validation

const userSchema = new Schema({
    username: { type: String, minlength: [4, 'Username must be at least 4 characters long'] },
    hashedPassword: { type: String, minlength: [3, 'Password must be at least 3 characters long'] },
    address: { type: String, maxlength: [20, 'Address must be at most 20 characters long'] },
    publications: { type: [ObjectId], ref: 'Publication', default: [] }

});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;

/*
•	Username - string (required), - min - 4
•	Password - string (required), - min - 3
•	Address - string (required), - max 20
•	My Publications - a collection of  Publication (a reference to the Publication Model)

*/