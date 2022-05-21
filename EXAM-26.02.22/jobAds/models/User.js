const { Schema, model, Types: {ObjectId} } = require('mongoose');


// TODO: add validation
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: {
        type: String, required: [true, 'Email is required'], validate: {
            validator(value) {

                return EMAIL_PATTERN.test(value)
            },
            message: 'Email must be valid and may contain only english letters'

        }
    },
    hashedPassword: { type: String,minlength: [5, 'Password must be at least 5 characters long'] },
    description: { type: String, maxlength: [40, 'Description must be at most 40 characters long'] },
    ads: {type: [ObjectId], ref: 'Ad', default: []}


});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;