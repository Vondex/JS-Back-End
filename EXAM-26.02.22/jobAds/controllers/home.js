//const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllAds, getLastThree } = require('../services/ad');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const ads = await getLastThree();
    res.render('home', { title: 'Home', ads } );
});

router.get('/catalog', async (req, res) => {
    const ads = await getAllAds();
    res.render('catalog', { title: 'Shared Ads', ads });
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const ad = res.locals.ad;
    ad.candidates = ad.workers.count
    ad.workersList = ad.workers.map(w => w.email).join(', ')
    if (req.session.user) {
        ad.hasUser = true;
        ad.isOwner = req.session.user._id == ad.owner._id;
        if (ad.workers.some(w => w._id == req.session.user._id)) {
            ad.isJoined = true;
        }
    }

    res.render('details', { title: 'Ads Details' });
});
/*
router.get('/profile', isUser(), async (req, res) => {
    const tripsByUser = await getAdByUser(res.locals.user._id);
    res.locals.user.tripCount = tripsByUser.length;
    res.locals.user.trips = tripsByUser;
    res.render('profile', { title: 'Profile Page' });
});
*/


module.exports = router;