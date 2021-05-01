var passport = require('passport')
var LocalStartegy=require('passport-local').Strategy
var JWTStartegy=require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt
var jwt=require('jsonwebtoken')
var User =require('./models/users')
var config = require('./config')

passport.use(new LocalStartegy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

exports.getToken=function(user){
    return jwt.sign(user,config.secretKey,{expiresIn:3600})
}

var opts={}
opts.jwtFromRequest=ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey=config.secretKey

exports.jwtPassport=passport.use(new JWTStartegy(opts,(jwt_payload,done)=>{
    //console.log("JWT_payload: ", jwt_payload)
    User.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err){
            //console.log("Error=err")
            return done(err,false)
        }else if(user){
            //console.log(user)
            return done(null,user);
        }
        else{
            //console.log("Error=sab khrab")
            return done(null,false)
        }
    })
}))

exports.verifyUser=passport.authenticate('jwt',{session:false})