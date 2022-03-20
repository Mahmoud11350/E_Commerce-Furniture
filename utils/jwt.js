const { sign } = require("jsonwebtoken");

const createToken = (userToken) => sign(userToken, process.env.TOKEN_SECRET);

const cookiesResponse = ({ res, userToken }) => {
  const token = createToken(userToken);
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: false,
    signed: true,
  });
  return token;
};

module.exports = cookiesResponse;
