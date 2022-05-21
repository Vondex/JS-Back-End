const homeController = require('../controllers/home');
const publicationController = require('../controllers/publication');
const authController = require('../controllers/auth');


module.exports = (app) => {
    app.use(homeController)
    app.use(authController)
    app.use(publicationController)

    app.get('*', (req, res) => {
        res.render('404', { title: 'Page not found' });
    });
}