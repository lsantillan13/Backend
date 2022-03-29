const AuthMongoDB = require('../../controllers/Auth/SignUp.js');

class SignUpDAO extends AuthMongoDB{
  constructor(){
    super(
      'users',
      {
        username: {type: String, required: true},
        password: {type: String, required: false}
      }
    );
  }
}

module.exports = SignUpDAO;