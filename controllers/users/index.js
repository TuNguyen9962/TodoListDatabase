const userHttpCode = require('./users_http_code');
const writeResponse = require('../../helpers/utils');
const middleWare = require('../../middlewares/check_token');
const helpers = require('../../helpers/utils');
const path = require('path');
const fs = require('fs');

// Đường dẫn đến file JSON
const usersDataFilePath = path.join(__dirname, '../../data/users.json');

exports.getUser = (request, response) => {
  try {
    const data = helpers.readFileDataJson(usersDataFilePath);
    helpers.writeResponse(
      userHttpCode.GET_USER_SUCCESSFUL.status,
      userHttpCode.GET_USER_SUCCESSFUL.message,
      response,
      data
    );
    response.end();
  } catch (err) {
    helpers.writeResponse(
      userHttpCode.SYSTEM_ERROR.status,
      userHttpCode.SYSTEM_ERROR.message,
      response,
      []
    );
    response.end();
  }
};

exports.createUser = (request, response) => {
  debugger
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    try {
      const parsedBody = JSON.parse(body); // Giả định rằng body luôn là JSON
      const username = parsedBody.username;
      const password = parsedBody.password;

      const user = {
        userId: helpers.generateUID(),
        username: username,
        password: password,
      };

      const data = helpers.readFileDataJson(usersDataFilePath);
      data.push(user);
      helpers.writeFileDataJson(usersDataFilePath, data);

      helpers.writeResponse(
        userHttpCode.USER_CREATED_SUCCESSFUL.status,
        userHttpCode.USER_CREATED_SUCCESSFUL.message,
        response,
        data
      );
    } catch (err) {
      helpers.writeResponse(
        userHttpCode.SYSTEM_ERROR.status,
        userHttpCode.SYSTEM_ERROR.message,
        response,
        []
      );
    } finally {
      response.end();
    }
  });
};


exports.updateUser = (request, response) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    try {
      const parsedBody = JSON.parse(body); // Giả định rằng body luôn là JSON
      const userId = parsedBody.userId;
      const updatedUsername = parsedBody.username;
      const updatedPassword = parsedBody.password;

      let data = helpers.readFileDataJson(usersDataFilePath);
      const userIndex = data.findIndex(user => user.userId === userId);

      if (userIndex === -1) {
        // Nếu user không tồn tại
        helpers.writeResponse(
          userHttpCode.USER_NOT_FOUND.status,
          userHttpCode.USER_NOT_FOUND.message,
          response,
          []
        );
      } else {
        // Cập nhật thông tin user
        data[userIndex].username = updatedUsername || data[userIndex].username;
        data[userIndex].password = updatedPassword || data[userIndex].password;

        helpers.writeFileDataJson(usersDataFilePath, data);

        helpers.writeResponse(
          userHttpCode.USER_UPDATED_SUCCESSFUL.status,
          userHttpCode.USER_UPDATED_SUCCESSFUL.message,
          response,
          data
        );
      }
    } catch (err) {
      helpers.writeResponse(
        userHttpCode.SYSTEM_ERROR.status,
        userHttpCode.SYSTEM_ERROR.message,
        response,
        []
      );
    } finally {
      response.end();
    }
  });
};


exports.deleteUser = (request, response) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    try {
      const parsedBody = JSON.parse(body); // Giả định rằng body luôn là JSON
      const userId = parsedBody.userId; // Lấy userId từ body

      let data = helpers.readFileDataJson(usersDataFilePath); // Đọc dữ liệu user từ file
      const userIndex = data.findIndex(user => user.userId == userId);

      if (userIndex === -1) {
        // Nếu user không tồn tại
        helpers.writeResponse(
          userHttpCode.USER_NOT_FOUND.status,
          userHttpCode.USER_NOT_FOUND.message,
          response,
          []
        );
      } else {
        // Xóa user
        debugger
        data.splice(userIndex, 1); // Xóa user khỏi danh sách
        helpers.writeFileDataJson(usersDataFilePath, data); // Ghi lại dữ liệu vào file

        helpers.writeResponse(
          userHttpCode.USER_DELETED_SUCCESSFUL.status,
          userHttpCode.USER_DELETED_SUCCESSFUL.message,
          response,
          data
        );
      }
    } catch (err) {
      helpers.writeResponse(
        userHttpCode.SYSTEM_ERROR.status,
        userHttpCode.SYSTEM_ERROR.message,
        response,
        []
      );
    } finally {
      response.end();
    }
  });
};



exports.login = (request, response) => {
  var body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });
  request.on('end', () => {
    const parsedBody = JSON.parse(body);
    if (parsedBody.username === 'user' && parsedBody.password === 'password') {
      const token = middleWare.getUserToken();
      writeResponse.writeResponse(
        userHttpCode.USER_AUTHENTICATED_SUCCESS.status,
        userHttpCode.USER_AUTHENTICATED_SUCCESS.message,
        response,
        token
      );
    } else {
      writeResponse.writeResponse(
        userHttpCode.USER_AUTHENTICATED_FAILED.status,
        userHttpCode.USER_AUTHENTICATED_FAILED.message,
        response
      );
    }
  });
};
