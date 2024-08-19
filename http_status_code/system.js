const HTTP_STATUS_CODE = {
    METHOD_NOT_ALLOWED: {
      message: 'Method Not Allowed',
      status: 405,
    },
    NOT_FOUND: {
      message: 'Not Found',
      status: 400,
    },
    USER_NOT_AUTHENTICATED: {
      message: 'User Not Authenticated',
      status: 401,
    },
  };
  
  module.exports = HTTP_STATUS_CODE;
  