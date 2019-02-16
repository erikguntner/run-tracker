const ThirdPartyApis = require('./controllers/thirdPartyApis');
const Authentication = require('./controllers/authentication');
const Routes = require('./controllers/routes');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  // Third party api routes
  app.post('/locations', ThirdPartyApis.getLocations);
  app.post('/elevation', ThirdPartyApis.getElevation);

  // Authentication routes
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/users', Authentication.getall);

  // Routes for adding running routes
  app.post('/routes', requireAuth, Routes.addRoute);
};
