const router = require('express').Router({ mergeParams: true });
const BuildTaskController = require('../controllers/build-task');
const BuildTaskTypeController = require('../controllers/build-task-type');
const { sessionAuth } = require('../middlewares');

router.get('/build/:build_id/tasks', sessionAuth, BuildTaskController.list);
router.get(
  '/build/:build_id/tasks/:build_task_id',
  sessionAuth,
  BuildTaskController.find,
);
router.post(
  '/build/:build_id/task',
  sessionAuth,
  BuildTaskController.createTasksForBuild,
);
router.put('/tasks/:build_task_id/:token', BuildTaskController.update);
router.get('/tasks/types', sessionAuth, BuildTaskTypeController.list);
router.get('/tasks/default-rules', sessionAuth, BuildTaskTypeController.getDefaultRules);
router.get('/tasks/:task_id/report/:sub_page?', sessionAuth, BuildTaskController.report);

module.exports = router;

// Rado: this should have removed the trailing ? from the route path and wrap it with {}, i.e. {:sub_page}