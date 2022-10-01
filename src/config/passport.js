const userModel = require('../models/user.model');
const passport = require('passport')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   
 
   userModel.findOne({_id: jwt_payload.id}, function(err, user) {
    
        if (err) {
            return done(err,false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(err, false,);
            // or you could create a new account
        }
    });
}));
