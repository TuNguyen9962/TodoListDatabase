const helpers = require('../helpers/utils')
const httpCode = require('../http_status_code/system')
function getUserToken() {
  return {token : '123456789'}
}

const checkToken = (req, res, next) => {
  const token = req.headers['authorization'];
  // console.log(token)
  if (!token) {
    helpers.writeResponse(httpCode.USER_NOT_AUTHENTICATED.status,httpCode.USER_NOT_AUTHENTICATED.message,res,[])
    return;
  }

  if (token !== '123456789') {
    
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      code: '403',
      message: 'Token is invalid',
    }));
    return;
  }

  next();  // Token hợp lệ, tiếp tục
};

module.exports = { getUserToken, checkToken }