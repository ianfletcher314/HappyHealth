const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    console.log('session >>> ', res.session)
    if (!req.session.loggedIn) {
      return res.status(403).end();
    
      // return res.redirect('/login');
    } else {
      next();
    }
};
  
module.exports = withAuth;