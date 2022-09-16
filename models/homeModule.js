const mongose=require('mongoose');
const schema=mongose.Schema;

const userSchema=new schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,//check for email which already exists
        required:true
    },
    password:{
        type:String,
        requires:true
    },

});
module.exports=mongose.model('RegisterEmployee',userSchema);//Inserting data into corresponding db table