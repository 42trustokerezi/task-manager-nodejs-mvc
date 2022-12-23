const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks')

router.route('/').get(controller.getAllTasks).post(controller.createTask);
router.route('/:id').get(controller.getSingleTask).patch(controller.UpdateTask).delete(controller.DeleteTask);

module.exports = router;