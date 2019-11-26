var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Client = require('./models/Client');



passport.use(new LocalStrategy(Client.authenticate()));
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());