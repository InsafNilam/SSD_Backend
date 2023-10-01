const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const Supervisor = require('../Models/Supervisor')



const keys = require('./key');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {

            //console.log(jwt_payload)
            
            const Supervisor = await Supervisor.findById(jwt_payload.id)

            if (Supervisor) {
                return done(null, Supervisor)
            }
            // else if (student) {
            //     return done(null, student)
            // }
            // else if (admin) {
            //     return done(null, admin)
            // }    
            else {
                console.log("Error")
            }
        }
        )
    )
};
