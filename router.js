const ThirdPartyApis = require("./controllers/thirdPartyApis");
// const Authentication = require('./controllers/authentication');
// const passportService = require('./services/passport');
// const passport = require('passport');

// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  // app.get('/', requireAuth, (req, res) => {
  //   res.send({ hi: 'there' });
  // });
  app.post("/locations", ThirdPartyApis.getLocations);
  app.post("/elevation", ThirdPartyApis.getElevation);

  // app.post("/signin", requireSignin, Authentication.signin);
  // app.post("/signup", Authentication.signup);
  // app.get("/signup", Authentication.getall);
};