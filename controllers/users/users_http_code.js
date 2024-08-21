const HTTP_STATUS_CODE = {
  USER_CREATED_SUCCESSFUL: {
    message: 'Create user successful',
    status: 201,
  },

  GET_USER_SUCCESSFUL: {
    message: 'Get user successful',
    status: 200,
  },

  UPDATE_USER_SUCCESSFUL: {
    message: 'Update user successful',
    status: 204,
  },

  DELETE_USER_SUCCESSFUL: {
    message: 'Delete user successful',
    status: 204,
  },

  USER_AUTHENTICATED_FAILED: {
    message: 'User authentication failed',
    status: 401,
  },

  USER_AUTHENTICATED_SUCCESS: {
    message: 'User authentication succeeded',
    status: 200,
  },
  USER_NOT_FOUND: {
    message: 'USER NOT FOUND',
    status: 404,
  },

  SYSTEM_ERROR: {
    message: 'SERVER_ERROR',
    status: 500,
  }
};

module.exports = HTTP_STATUS_CODE;
