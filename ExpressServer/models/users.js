const mongoose = require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')
const Schema=mongoose.Schema;

// const userSchema=new Schema({
//     username:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     admin:{
//         type:Boolean,
//         default:false
//     }
// },{
//     timestamps:true
// })

var User= new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    }
})

User.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',User)