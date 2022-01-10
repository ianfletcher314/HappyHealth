// authetication function that redirects user to login if the session loggin != true
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.status(403).end();
  } else {
    next();
  }
};

module.exports = withAuth;
