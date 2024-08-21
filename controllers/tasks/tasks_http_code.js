const HTTP_STATUS_CODE = {
  TASK_CREATED_SUCCESSFUL: {
    message: 'Create task successful',
    status: 201,
  },

  GET_TASK_SUCCESSFUL: {
    message: 'Get task successful',
    status: 200,
  },
  UPDATE_TASK_SUCCESSFUL: {
    message: 'Update task successful',
    status: 204,
  },
  DELETE_TASK_SUCCESSFUL: {
    message: 'Delete task successful',
    status: 204,
  },
  USER_NOT_AUTHENTICATED: {
    message: 'User Not Authenticated',
    status: 401,
  },
  SYSTEM_ERROR: {
    message: 'SERVER_ERROR',
    status: 500,
  },
  BAD_REQUEST:{
    message: 'Bad request',
    status: 400,
  },
  TASK_NOT_FOUND:{
    message: 'Task not found',
    status: 400,
  },
};

module.exports = HTTP_STATUS_CODE;
