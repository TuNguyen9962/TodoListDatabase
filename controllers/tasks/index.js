
const tasksHttpCode = require('./tasks_http_code')
const helpers = require('../../helpers/utils')
const path = require('path');
const fs = require('fs');

// Đường dẫn đến file JSON
const tasksDataFilePath = path.join(__dirname, '../../data/tasks.json');

exports.getUserTask = (request, response) => {
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
exports.createUserTask = (request, response) => {
  try {
    debugger
    const data = helpers.readFileDataJson(tasksDataFilePath)

    let body = '';
    let task = {};
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
        helpers.writeFileDataJson(tasksDataFilePath, data)
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
exports.updateUserTask = (request, response) => {
  try {
    debugger
    const data = helpers.readFileDataJson(tasksDataFilePath)

    let body = '';
    let task = {};

    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      const parsedBody = JSON.parse(body);
      let name = parsedBody.name;
      let isDone = parsedBody.isDone;
      let userId = parsedBody.userId;
      let taskId = parsedBody.taskId;

      task = {
        taskId: taskId,
        userId: userId,
        name: name,
        isDone: isDone
      }

      if (name && isDone && userId && taskId) {
        let index = data.findIndex(data => data.taskId === taskId);
        if (index !== -1) {
          data[index] = task;
        }
        helpers.writeFileDataJson(tasksDataFilePath, data);
        helpers.writeResponse(
          tasksHttpCode.UPDATE_TASK_SUCCESSFUL.status,
          tasksHttpCode.UPDATE_TASK_SUCCESSFUL.message,
          response,
          data
        )
        response.end();
      }
      else {
        helpers.writeResponse(
          tasksHttpCode.UPDATE_TASK_SUCCESSFUL.status,
          tasksHttpCode.UPDATE_TASK_SUCCESSFUL.message,
          response,
          data
        )
        response.end();
      }

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
exports.deleteUserTask = (request, response) => {
  try {
    debugger
    const data = helpers.readFileDataJson(tasksDataFilePath)
    let body = '';
    let task = {};
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      const parsedBody = JSON.parse(body);
      let taskId = parsedBody.taskId;
      
      if ( taskId) {
        let index = data.findIndex(data => data.taskId === taskId);
        if (index !== -1) {
          data.splice(index, 1);
        }
        helpers.writeFileDataJson(tasksDataFilePath, data);
        helpers.writeResponse(
          tasksHttpCode.UPDATE_TASK_SUCCESSFUL.status,
          tasksHttpCode.UPDATE_TASK_SUCCESSFUL.message,
          response,
          data
        )
        response.end();
      }
      else {
        helpers.writeResponse(
          tasksHttpCode.SYSTEM_ERROR.status,
          tasksHttpCode.SYSTEM_ERROR.message,
          response,
          [])
        response.end();
      }
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