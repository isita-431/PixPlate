const jwt = require("jsonwebtoken");
const User = require("../database/models/user.model");

const auth = async (req, res, next) => {
  const { cookies } = req;
  if (cookies.jwt) {
    try {
      const data = jwt.verify(cookies.jwt, process.env.SECRET);
      const user = await User.findById(data.id);
      req.user = user;
      req.id = data.id;
      req.token = cookies.jwt;
      return next();
    } catch (error) {
      console.log(error.message);
    }
  }

  return res.status(401).send({
    success: false,
    message: "Sorry you are not authenticated.",
  });
};

module.exports = { auth };
