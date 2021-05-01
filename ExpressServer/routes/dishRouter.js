const express = require('express')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')

const Dishes = require('../models/dishes')
const authenticate=require('../authenticate')
const dishRouter = express.Router()

dishRouter.use(bodyParser.json({limit:'50mb'}))
dishRouter.use(bodyParser.urlencoded({limit:'50mb',extended:true}))

dishRouter.route('/').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain')
    next();
})
.get((req,res,next)=>{
    Dishes.find({}).then((dishes)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(dishes);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
    //console.log('Verified Request')
    //console.log(req.body)
    if(req.user.admin===true){
        Dishes.create(req.body).then((dish)=>{
            console.log('Dish created: ',dish);
            res.statusCode=200;
            res.setHeader('Content-type','application/json')
            res.json(dish)
        }
    ,(err)=>next(err))
    .catch((err)=>next(err))
    }else{
        res.statusCode=401;
        res.setHeader('Content-type','application/json')
        var error=new Error('Permission denied for non-admin users!')
        console.log('Error is: ',error)
        res.json({error:error,success:false})
    }
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403
    res.end('PUT not supported on /dishes')
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    if(req.user.admin===true){
        Dishes.remove({}).then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-type','application/json')
            res.json(resp)
        },(err)=>next(err))
        .catch((err)=>next(err))
    }else{
        res.statusCode=401;
        res.setHeader('Content-type','application/json')
        var error=new Error('Permission denied for non-admin users!')
        console.log('Error is: ',error)
        res.json({error:error,success:false})
    }
});


dishRouter.route('/:dishId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId).then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403
    res.end('POST not supported on /dishes/'+req.params.dishId)
})
.put(authenticate.verifyUser,(req,res,next)=>{
    if(req.user.admin===true){
        Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true}).then((dish)=>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json')
        res.json(dish);
        },(err)=>next(err))
        .catch((err)=>next(err))
    }else{
        res.statusCode=401;
        res.setHeader('Content-type','application/json')
        var error=new Error('Permission denied for non-admin users!')
        console.log('Error is: ',error)
        res.json({error:error,success:false})
    }
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    if(req.user.admin===true){
        Dishes.findByIdAndRemove(req.params.dishId).then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-type','application/json')
            res.json(resp)
        },(err)=>next(err))
        .catch((err)=>next(err))
    }else{
        res.statusCode=401;
        res.setHeader('Content-type','application/json')
        var error=new Error('Permission denied for non-admin users!')
        console.log('Error is: ',error)
        res.json({error:error,success:false})
    }
});

dishRouter.route('/:dishId/comment')
.post(authenticate.verifyUser,(req,res,next)=>{
    Dishes.findById(req.params.dishId).then((dish)=>{
        //console.log('Comment poster user: ',req.user)
        const auth=req.user.admin===true?('admin'):(req.user.firstname+" "+req.user.lastname)
        const comm={...req.body,author:auth}
        console.log('New Comment: ',comm)
        dish.comments.push(comm)
        dish.save()
        //console.log(dish.comments)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(dish)
    },err=>next(err))
    .catch((err)=>next(err))
})
dishRouter.route('/:dishId/comment/:commentId')
.put(authenticate.verifyUser,(req, res, next) => {
//.put((req, res, next) => {
Dishes.findById(req.params.dishId)
.then((dish)=>{
    if(dish!=null&&dish.comments.id(req.params.commentId)!=null){
        if((dish.comments.id(req.params.commentId).author===req.user.firstname+" "+req.user.lastname)||req.user.admin){
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating=req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment=req.body.comment;
            }
        }else{
            err = new Error('Cannot edit this comment');
            err.status = 403;
            return next(err);
        }
    dish.save()
    .then((dish)=>{
        Dishes.findById(dish._id)
        .then((dish)=>{
        //console.log(dish.comments)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish); 
        })
    },(err)=>next(err));
    }
    else if(dish==null){
    err = new Error('Dish ' + req.params.dishId + ' not found');
    err.status = 404;
    return next(err);
    }
    else{
    err = new Error('Comment ' + req.params.commentId + ' not found');
    err.status = 404;
    return next(err); 
    }
},(err)=>next(err))
.catch((err)=>next(err));
})

.delete(authenticate.verifyUser,(req, res, next) => {
//.put((req, res, next) => {
Dishes.findById(req.params.dishId)
.then((dish)=>{
    if(dish!=null&&dish.comments.id(req.params.commentId)!=null){
        if(req.user.admin){
                dish.comments.id(req.params.commentId).remove()
        }else{
            err = new Error('Cannot edit this comment');
            err.status = 400;
            return next(err);
        }
    dish.save()
    .then((dish)=>{
        Dishes.findById(dish._id)
        .then((dish)=>{
        console.log(dish.comments)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish); 
        })
    },(err)=>next(err));
    }
    else if(dish==null){
    err = new Error('Dish ' + req.params.dishId + ' not found');
    err.status = 404;
    return next(err);
    }
    else{
    err = new Error('Comment ' + req.params.commentId + ' not found');
    err.status = 404;
    return next(err); 
    }
},(err)=>next(err))
.catch((err)=>next(err));
})


  module.exports=dishRouter;