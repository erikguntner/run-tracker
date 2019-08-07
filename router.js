const ThirdPartyApis = require('./controllers/thirdPartyApis');
const Authentication = require('./controllers/authentication');
const RunLog = require('./controllers/runLog');
const Routes = require('./controllers/routes');
const User = require('./controllers/user');
const Goal = require('./controllers/goal');
const MapImage = require('./controllers/mapImage');
const Upload = require('./controllers/upload');
const passportService = require('./services/passport');
const passport = require('passport');

const { catchErrors } = require('./handlers/errorHandlers');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  // Third party api routes
  app.post('/api/locations', ThirdPartyApis.getLocations);
  app.post('/api/elevation', ThirdPartyApis.getElevation);

  // Authentication routes
  app.post('/api/signin', requireSignin, catchErrors(Authentication.signin));
  app.post('/api/signup', catchErrors(Authentication.signup));
  app.get('/api/users', Authentication.getall);

  // User
  app.get('/api/user/:id', User.getUserById);
  app.get('/api/user', requireAuth, User.getUserData);

  // Routes for adding running routes
  app.delete(
    '/api/routes/delete',
    requireAuth,
    catchErrors(Routes.deleteRoute)
  );
  // app.post(
  //   '/routes/:id',
  //   requireAuth,
  //   MapImage.screenshotMap,
  //   catchErrors(Routes.addRoute)
  // );
  app.post('/api/routes/:id', requireAuth, catchErrors(Routes.addRoute));
  app.get('/api/routes', requireAuth, catchErrors(Routes.getAllRoutes));

  //ROutes for logging runs
  app.post('/api/runs', requireAuth, catchErrors(RunLog.postRun));
  app.get('/api/runs', requireAuth, catchErrors(RunLog.getRunsByDate));
  app.get('/api/runs/week', requireAuth, catchErrors(RunLog.getThisWeeksRuns));
  app.get(
    '/api/runs/month/:id',
    requireAuth,
    catchErrors(RunLog.getRunsByMonth)
  );

  // ROUTES FOR GOALS
  app.post('/api/goal', requireAuth, catchErrors(Goal.setGoal));

  //ROUTE FOR UPLOADING AND HANDLING IMAGES TO S#
  app.post('/api/upload', requireAuth, MapImage.screenshotMap, Upload.uploadImage);
};
