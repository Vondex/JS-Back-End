const { isUser } = require('../middleware/guards');
const { getPublications, getPublicationById, getPublicationsByAuthor } = require('../services/publication');
const { publicationViewModel } = require('../util/mappers')

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

router.get('/catalog', async (req, res) => {
    const publications = (await getPublications()).map(publicationViewModel);
    res.render('catalog', {title: 'Art Gallery', publications})
});

router.get('/catalog/:id', async (req, res) => {
    const id = req.params.id;
    const publication = publicationViewModel(await getPublicationById(id));


    if (req.session.user) {
        publication.hasUser = true;
        if (req.session.user._id == publication.author._id){

            publication.isAuthor = true;
        } else {

            publication.hasShared = publication.shares.find(v => v._id == req.session.user._id) != undefined;
        }
        
    }

    res.render('details', {title: publication.title, publication});
});

router.get('/profile', isUser(), async (req, res) => {

    const publications = (await getPublicationsByAuthor(req.session.user._id)).map(publicationViewModel);
    res.render('profile', {title: 'My Publications', publications})

});


module.exports = router;