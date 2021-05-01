var express = require('express');
var router = express.Router();
var passport=require('passport')
const bodyParser=require('body-parser')
const Users=require('../models/users')
const authenticate=require('../authenticate')
/* GET users listing. */

router.use(bodyParser.json())

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup',(req,res,next)=>{
  Users.register(new Users({username:req.body.username,firstname:req.body.firstname,lastname:req.body.lastname}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode=500
      res.setHeader('Content-Type','application/json')
      res.json({err:err})
    }else{
      passport.authenticate('local')(req,res,()=>{
        var token= authenticate.getToken({_id:req.user._id})
        //console.log(req.user)

        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json({success:true,token:token,admin:req.user.admin,author:req.user.firstname+' '+req.user.lastname,status:'Registration Successful'})
      })
    }
  })
})

router.post('/login',passport.authenticate('local',{failureMessage:'Invalid Password'}),(req,res,next)=>{
  var token= authenticate.getToken({_id:req.user._id})
  res.statusCode=200;
  res.setHeader('Content-Type','application/json')
  res.json({success:true,token:token,admin:req.user.admin,author:req.user.firstname+' '+req.user.lastname,status:'Logged in Successfully'})
})

router.get('/logout',(req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id')
    res.redirect('/')
  }else{
    var err=new Error('Not Logged in!');
    err.status=403
    next(err)
  }
})


module.exports = router;
