const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User =  require('../models/User');
const keys = require('../config/keys');



const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports= passport => {
 
    passport.use(new JWTStrategy(opts, (jwt_payload,done)=>{
      User.findById(jwt_payload.id)
        .then(user=>{
          if(user){
            return done(null, user);
          }else{
            return done(null,false);
          }
        }).catch(err => console.log(err));
    })
    )
}