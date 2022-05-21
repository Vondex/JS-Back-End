const router = require('express').Router();
const { isUser } = require('../middleware/guards');
const { createPublication, getPublicationById, updatePublication, deletePublication, share } = require('../services/publication');
const { mapErrors, publicationViewModel } = require('../util/mappers');

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Publication' });
});
router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const publication = {

        title: req.body.title,
        tech: req.body.tech,
        picture: req.body.picture,
        certificate: req.body.certificate,
        author: userId
    };

    try {

        await createPublication(publication);
        res.redirect('/catalog');

    } catch (err) {

        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Publication', errors, data: publication });
    }

});

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const publication = publicationViewModel(await getPublicationById(id));


    if (req.session.user._id != publication.author._id) {

        return res.redirect('/login');
    }

    res.render('edit', {title: 'Edit Publication', publication}) 
});

router.post('/edit/:id', isUser(), async (req, res) => {

    const id = req.params.id;
    const existing = publicationViewModel(await getPublicationById(id));


    if (req.session.user._id != existing.author._id) {

        return res.redirect('/login');
    }
    const publication = {

        title: req.body.title,
        tech: req.body.tech,
        picture: req.body.picture,
        certificate: req.body.certificate
        
    };

    try{

        await updatePublication(id, publication);
        res.redirect('/catalog/' + id);

    } catch (err){
        console.error(err);
        const errors = mapErrors(err);
        publication._id = id
        res.render('edit', {title: 'Edit Publication', publication, errors}) 
    }

});

router.get('/delete/:id', async (req, res) => {

    const id = req.params.id;
    const existing = publicationViewModel(await getPublicationById(id));


    if (req.session.user._id != existing.author._id) {

        return res.redirect('/login');
    }

    try{

        await deletePublication(id);
        res.redirect('/catalog');

    } catch (err){
        console.error(err);
        const errors = mapErrors(err);
        res.render('details', {title: existing.title, errors}); 
    }
});

router.get('/share/:id', isUser(), async (req, res) => {
    const id = req.params.id; 
    const value = 1;

    try {

        await share(id, req.session.user._id, value);

        res.redirect('/');

    } catch (err){

        console.error(err);
        const errors = mapErrors(err);
        res.render('details', {title: 'Publication Details', errors}); 
    }
})
module.exports = router;