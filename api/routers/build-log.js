const router = require('express').Router();
const BuildLogController = require('../controllers/build-log');
const { sessionAuth } = require('../middlewares');

// Remove the trailing slash from the route path
router.get(
  '/build/:build_id/log(/offset/:offset)?', // Removed trailing slash
  sessionAuth,
  BuildLogController.find,
);

module.exports = router;

// Rado: this should have removed the trailing ? from the route path