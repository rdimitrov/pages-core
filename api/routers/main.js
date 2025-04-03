const router = require('express').Router({ mergeParams: true });

const MainController = require('../controllers/main');
const csrfProtection = require('../middlewares/csrfProtection');

router.get('/', MainController.home);
router.get('/system-use', MainController.systemUse);

// add csrf middleware to app route so that we can use request.csrfToken()
router.get('/organizations/:id?', csrfProtection, MainController.app);
router.get('/sites/:id?', csrfProtection, MainController.app);
router.get('/settings', csrfProtection, MainController.app);

router.get('/robots.txt', MainController.robots);

router.options('/*', (_req, res) => res.status(404).send());

// Rado: this should have removed the (/*)? and replaced it with {/*splat}