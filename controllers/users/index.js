const userHttpCode = require('./users_http_code')
const writeResponse = require('../../helpers/utils')
const middleWare = require('../../middlewares/check_token')


exports.getUser = (request, response) => {
  writeResponse(userHttpCode.GET_USER_SUCCESSFUL.status, userHttpCode.GET_USER_SUCCESSFUL.message, response, 'Task data')
  response.end();
};

exports.createUser = (request, response) => {
  writeResponse(userHttpCode.USER_CREATED_SUCCESSFUL.status, userHttpCode.USER_CREATED_SUCCESSFUL.message, response, 'Task data')
  response.end();
};


exports.updateUser = (request, response) => {
  writeResponse(userHttpCode.UPDATE_USER_SUCCESSFUL.status, userHttpCode.UPDATE_USER_SUCCESSFUL.message, response, 'Task data')
  response.end();
}

exports.deleteUser = (request, response) => {
  writeResponse(userHttpCode.DELETE_USER_SUCCESSFUL.status, userHttpCode.DELETE_USER_SUCCESSFUL.message, response, 'Task data')
  response.end();
}


exports.login = (request, response) => {
  var body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    const parsedBody = JSON.parse(body);
    if (parsedBody.username === 'user' && parsedBody.password === 'password') {
      const token = middleWare.getUserToken();
      writeResponse.writeResponse(userHttpCode.USER_AUTHENTICATED_SUCCESS.status, userHttpCode.USER_AUTHENTICATED_SUCCESS.message, response, token)
      
    } else {
      writeResponse.writeResponse(userHttpCode.USER_AUTHENTICATED_FAILED.status, userHttpCode.USER_AUTHENTICATED_FAILED.message,response)
    }
  });
}
