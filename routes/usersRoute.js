const controller = require('../controllers');

module.exports = {
  GET: controller.users.getUser,
  POST: controller.users.createUser,
  PUT: controller.users.updateUser,
  DELETE: controller.users.deleteUser,
};
