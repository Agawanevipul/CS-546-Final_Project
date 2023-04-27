const exportedMethods={
    isAuthenticated(req, res, next){
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        res.redirect('/admin');
      } else if (req.session.user.role === 'user') {
        res.redirect('/protected');
      }
    } else {
      res.redirect('/login');
    }
  },
  // Log In redirect middleware function
  loginRoute(req, res, next){
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        res.redirect('/admin');
      } else if (req.session.user.role === 'user') {
        res.redirect('/protected');
      }
    } else {
      next();
    }
  },
  
  // Register redirect middleware function
  registerRoute(req, res, next){
    if (req.session.user) {
      let { role } = req.user || {};
      if (role === 'admin') {
        res.redirect('/admin');
      } else if (role === 'user') {
        res.redirect('/protected');
      }
    } else {
      next();
    }
  },
  
  // Protected redirect middleware function
  protectedRoute(req, res, next){
    
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  
  // Admin redirect middleware function
  adminRoute(req, res, next){
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        next();
      } else {
        res.status(403).send('You do not have permission to view this page');
      }
    } else {
      res.redirect('/login');
    }
  },
  
  // Logout redirect middleware function
  logoutRoute(req, res, next){
    
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
    
  },
  // Logging timing middleware function
  logDetails(req, res, next){
    let auth;
    if(req.session.user===null){
      auth='Non-Authenticated User'
    }else{
      auth ='Authenticated User'
    }
    console.log(`[${new Date().toUTCString()}] ${req.method} ${req.originalUrl} User Authenticated: (${auth})`);
    next();
  },
}

export default exportedMethods;