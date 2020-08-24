import jwt from 'jsonwebtoken';

function authentication(req, res, next) {
  // const token = req.get('token');
  next();

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   if (decoded) {
  //     next();
  //   } else {
  //     return res.status(401).send();
  //   }
  // } catch (err) {
  //   console.log(err);
  //   return res.status(401).send();
  // }
}

export default authentication;
