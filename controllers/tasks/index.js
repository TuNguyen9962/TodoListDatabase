
const tasksHttpCode = require('./tasks_http_code')
const helpers = require('../../helpers/utils')
const path = require('path');
const fs = require('fs');

// Đường dẫn đến file JSON
const tasksDataFilePath = path.join(__dirname, '../../data/tasks.json');

exports.getUsertask = (request, response) => {
  try {
    const data = helpers.readFileDataJson(tasksDataFilePath)
    helpers.writeResponse(
      tasksHttpCode.GET_TASK_SUCCESSFUL.status,
      tasksHttpCode.GET_TASK_SUCCESSFUL.message,
      response,
      data
    )
    response.end();

  } catch (err) {
    helpers.writeResponse(
      tasksHttpCode.SYSTEM_ERROR.status,
      tasksHttpCode.SYSTEM_ERROR.message,
      response,
      []
    )
    response.end();
  }
};

exports.createUsertask = (request, response) => {
  try {
    debugger
    const data = helpers.readFileDataJson(tasksDataFilePath)

    var body = '';
    var task = {};
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      const parsedBody = JSON.parse(body);
      let name = parsedBody.name;
      let isDone = parsedBody.isDone;
      let userId = parsedBody.userId;
      task = {
        taskId: helpers.generateUID(),
        userId: userId,
        name: name,
        isDone: isDone
      }

      if (name && isDone && userId) {
        data.push(task);
        helpers.writeFileDataJson(tasksDataFilePath,data)
      }
      helpers.writeResponse(
        tasksHttpCode.TASK_CREATED_SUCCESSFUL.status,
        tasksHttpCode.TASK_CREATED_SUCCESSFUL.message,
        response,
        data
      )
      response.end();
    });
    

  } catch (err) {
    helpers.writeResponse(
      tasksHttpCode.SYSTEM_ERROR.status,
      tasksHttpCode.SYSTEM_ERROR.message,
      response,
      []
    )
    response.end();
  }

};

exports.updateUsertask = (request, response) => {
  helpers.writeResponse(tasksHttpCode.UPDATE_TASK_SUCCESSFUL.status,
    tasksHttpCode.UPDATE_TASK_SUCCESSFUL.message,
    response,
    'Task data')
  response.end();
};

exports.deleteUsertask = (request, response) => {
  helpers.writeResponse(
    tasksHttpCode.DELETE_TASK_SUCCESSFUL.status,
    tasksHttpCode.DELETE_TASK_SUCCESSFUL.message,
    response,
    'Task data')
  response.end();
};