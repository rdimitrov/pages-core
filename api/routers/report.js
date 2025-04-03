const router = require('express').Router({ mergeParams: true });

const MainController = require('../controllers/main');
const { csrfProtection } = require('../middlewares');

// add csrf middleware to app route so that we can use request.csrfToken()
router.get('/report/:id?', csrfProtection, MainController.report);

module.exports = router;

// Rado: this should have removed the (/*)? and replaced it with {/*splat}