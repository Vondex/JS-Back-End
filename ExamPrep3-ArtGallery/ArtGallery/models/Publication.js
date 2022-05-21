const { Schema, model, Types: { ObjectId } } = require('mongoose');
const URL_PATTERN = /^https?:\/\/(.+)/;

const publicationSchema = new Schema({

    title: { type: String, minlength: [6, 'Title must be at least 6 characters long'] },
    tech: { type: String, maxlength: [15, 'Technique must be at most 15 characters long'] },
    location: { type: String, maxlength: [15, 'Location must be at most 15 characters long'] },
    picture: {
        type: String, validate: {
            validator(value) {

                return URL_PATTERN.test(value);
            },
            message: 'Picture must be a valid URL'
        }
    },
    certificate: { type: String, required: true, enum: ['Yes', 'No'] },
    author: { type: ObjectId, ref: 'User', required: true},
    shares: { type: [ObjectId], ref: 'User', default: [] },
    rating: { type: Number, default: 0}

});

const Publication = model('Publication', publicationSchema);

module.exports = Publication;

/*
•	Title - string (required), min 6
•	Painting technique - string (required), max 15
•	Art picture - string (required), valid url
•	Certificate of authenticity - string ("Yes", "No") required,
•	Author - object Id (a reference to the User model),
•	Users Shared - a collection of Users (a reference to the User model)

*/