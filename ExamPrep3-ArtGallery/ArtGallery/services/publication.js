const Publication = require('../models/Publication');

async function createPublication(publication){
    const result = new Publication(publication);
    await result.save();

    return result;
    
}

async function getPublications(){
    return Publication.find({});
}

async function getPublicationsByAuthor(userId){
    return Publication.find({ author: userId }).populate('author', 'username');
}


async function getPublicationById(id){
    return Publication.findById(id).populate('author', 'username').populate('shares', 'username');
}

async function updatePublication(id, publication){
    const existing = await Publication.findById(id);

    existing.title = publication.title;
    existing.tech = publication.tech;
    existing.picture = publication.picture;
    existing.certificate = publication.certificate;

    await existing.save();

}

async function deletePublication(id){
    return Publication.findByIdAndDelete(id);
}

async function share(publicationId, userId, value){

    const publication = await Publication.findById(publicationId);

    if (publication.shares.includes(userId)) {
        throw new Error('User has already shared');
    }

    publication.shares.push(userId);
    publication.rating += value;

    await publication.save();

}

module.exports = {
    createPublication,
    getPublications,
    getPublicationById,
    getPublicationsByAuthor,
    updatePublication,
    deletePublication,
    share
};