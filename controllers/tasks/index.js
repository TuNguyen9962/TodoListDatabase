
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
    );
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
    const data = helpers.readFileDataJson(tasksDataFilePath)
    debugger
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
      if (name && isDone && userId) {
        task = {
          taskId: helpers.generateUID(),
          userId: userId,
          name: name,
          isDone: isDone
        }
        data.push(task);
        helpers.writeFileDataJson(tasksDataFilePath, data)
        helpers.writeResponse(
          tasksHttpCode.TASK_CREATED_SUCCESSFUL.status,
          tasksHttpCode.TASK_CREATED_SUCCESSFUL.message,
          response,
          []
        )
        response.end();
      }
      else {
        helpers.writeResponse(
          tasksHttpCode.BAD_REQUEST.status,
          tasksHttpCode.BAD_REQUEST.message,
          response,
          []
        );
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
exports.updateUserTask = (request, response) => {
  try {
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
      if (name && isDone && userId && taskId) {
        let task = {
          taskId: taskId,
          userId: userId,
          name: name,
          isDone: isDone
        }
        let index = data.findIndex(data => data.taskId === taskId);
        if (index !== -1) {
          data[index] = task;
          helpers.writeFileDataJson(tasksDataFilePath, data);
          helpers.writeResponse(
            tasksHttpCode.UPDATE_TASK_SUCCESSFUL.status,
            tasksHttpCode.UPDATE_TASK_SUCCESSFUL.message,
            response,
            []
          )
          response.end();
        }
        else {
          helpers.writeResponse(
            tasksHttpCode.BAD_REQUEST.status,
            tasksHttpCode.BAD_REQUEST.message,
            response,
            []
          );
          response.end();
        }

      }
      else {
        helpers.writeResponse(
          tasksHttpCode.BAD_REQUEST.status,
          tasksHttpCode.BAD_REQUEST.message,
          response,
          []
        );
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
exports.deleteUserTask = async (request, response) => {
  debugger

  try {
    let body = '';
    let task = {};
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      // const parsedBody = JSON.parse(body);
      let parsedBody;
      try {
        parsedBody = JSON.parse(body);
      } catch (err) {
        // Xử lý lỗi khi parse JSON
        helpers.writeResponse(
          tasksHttpCode.BAD_REQUEST.status,  // Mã lỗi cho request không hợp lệ
          'Invalid JSON format',  // Thông báo lỗi cụ thể
          response,
          []
        );
        return response.end();
      }
      let taskId = parsedBody.taskId;

      if (taskId) {
        let index = data.findIndex(data => data.taskId === taskId);
        if (index !== -1) {
          data.splice(index, 1);
          helpers.writeFileDataJson(tasksDataFilePath, data);
          helpers.writeResponse(
            tasksHttpCode.UPDATE_TASK_SUCCESSFUL.status,
            tasksHttpCode.UPDATE_TASK_SUCCESSFUL.message,
            response,
            []
          );
          response.end();
        }
        else {
          helpers.writeResponse(
            tasksHttpCode.TASK_NOT_FOUND.status,
            tasksHttpCode.TASK_NOT_FOUND.message,
            response,
            []
          );
          response.end();
        }
      }
      else {
        helpers.writeResponse(
          tasksHttpCode.SYSTEM_ERROR.status,
          tasksHttpCode.SYSTEM_ERROR.message,
          response,
          []);
        response.end();
      }
    });
  } catch (err) {
    helpers.writeResponse(
      tasksHttpCode.SYSTEM_ERROR.status,
      tasksHttpCode.SYSTEM_ERROR.message,
      response,
      []
    );
    response.end();
  }
};