const controller = require('../controllers');
const Middleware = require('../middlewares/check_token');
const run = require('./run');

module.exports = {
  GET:    run([], controller.tasks.getUserTask),
  POST:   run([], controller.tasks.createUserTask),
  PUT:    run([], controller.tasks.updateUserTask),
  DELETE: run([], controller.tasks.deleteUserTask),
};

