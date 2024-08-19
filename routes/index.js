const todoRoute = require('./tasksRoute');
const userRoute = require('./usersRoute');

module.exports = {
  '/api/tasks': todoRoute,
  '/api/users': userRoute,
};
