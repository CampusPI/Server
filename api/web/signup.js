var signup = function (request, reply) {
  var form = '<form action="/api/web/users" method="post"> <div> <label>Username:</label> <input type="text" name="username"/> </div> <div> <label>Password:</label> <input type="password" name="password"/> </div> <div> <input type="submit" value="Signup"/> </div> </form>';
  reply(form);
}

module.exports.handler = signup;
