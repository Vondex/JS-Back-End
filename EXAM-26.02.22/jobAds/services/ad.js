const Ad = require('../models/Ad');

async function getAllAds() {
    return Ad.find({}).lean();
}
async function getLastThree() {
    return Ad.find({}).limit(3).lean();
}

async function getAdByUser(userId) {
    return Ad.find({owner: userId}).lean();
}

async function getAdById(id) {
    return Ad.findById(id).lean();
}

async function getAdAndUsers(id) {
    return Ad.findById(id).populate('owner').populate('workers').lean();
}


async function createAd(ad) {
    const result = new Ad(ad);
    await result.save();
}

async function updateAd(id, ad) {
    const existing = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.name = ad.name;
    existing.description = ad.description;
   

    await existing.save();
}

async function deleteById(id) {
    return Ad.findByIdAndDelete(id);
}

async function joinAd(adId, userId) {
    const ad = await Ad.findById(adId);

    if (ad.workers.includes(userId)) {
        throw new Error('User is already part of the Ad');
    }

    ad.workers.push(userId);
    await ad.save();
}

module.exports = {
    getAllAds,
    getAdAndUsers,
    getAdById,
    createAd,
    updateAd,
    deleteById,
    joinAd,
    getAdByUser,
    getLastThree
};