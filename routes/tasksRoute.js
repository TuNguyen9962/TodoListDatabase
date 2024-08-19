const controller = require('../controllers');
const Middleware = require('../middlewares/check_token');
const run = require('./run');

module.exports = {
  GET:    run([Middleware.checkToken], controller.tasks.getUsertask),
  POST:   run([Middleware.checkToken], controller.tasks.createUsertask),
  PUT:    run([Middleware.checkToken], controller.tasks.updateUsertask),
  DELETE: run([Middleware.checkToken], controller.tasks.deleteUsertask),
};

