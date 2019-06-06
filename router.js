const ThirdPartyApis = require('./controllers/thirdPartyApis');
const Authentication = require('./controllers/authentication');
const RunLog = require('./controllers/runLog');
const Routes = require('./controllers/routes');
const User = require('./controllers/user');
const Goal = require('./controllers/goal');
const Image = require('./controllers/image');
const passportService = require('./services/passport');
const passport = require('passport');

const { catchErrors } = require('./handlers/errorHandlers');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  // Third party api routes
  app.post('/locations', ThirdPartyApis.getLocations);
  app.post('/elevation', ThirdPartyApis.getElevation);

  // Authentication routes
  app.post('/signin', requireSignin, catchErrors(Authentication.signin));
  app.post('/signup', catchErrors(Authentication.signup));
  app.get('/users', Authentication.getall);

  // User
  app.get('/user/:id', User.getUserById);
  app.get('/user', requireAuth, User.getUserData);

  // Routes for adding running routes
  app.delete('/routes/delete', requireAuth, catchErrors(Routes.deleteRoute));
  app.post('/routes/:id', requireAuth, catchErrors(Routes.addRoute));
  app.get('/routes', requireAuth, catchErrors(Routes.getAllRoutes));

  //ROutes for logging runs
  app.post('/runs', requireAuth, catchErrors(RunLog.postRun));
  app.get('/runs', requireAuth, catchErrors(RunLog.getRunsByDate));
  app.get('/runs/week', requireAuth, catchErrors(RunLog.getThisWeeksRuns));
  app.get('/runs/month/:id', requireAuth, catchErrors(RunLog.getRunsByMonth));

  // ROUTES FOR GOALS
  app.post('/goal', requireAuth, catchErrors(Goal.setGoal));

  // ROUTE FOR SAVING MAP IMAGES
  app.get('/image', Image.saveImage);
};
