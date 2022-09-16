const express=require('express');
const Router=express.Router();
const userSchema=require('../models/homeModule');
//Sign-up Form
Router.get("/",(req,res)=>{

    res.render('Register',{message:req.flash('message')});
});
Router.post('/register',async(req,res)=>{
     try{
        const{
            name,
            number,
            email,
            password,
            cpassword
        }=req.body;
        if(password===cpassword){
            const userData=new userSchema({
                name,
                number,
                email,
                password

            });
            userData.save(err=>{
                if(err){
                    req.flash('message','Email already exists!');
                    res.redirect('/');
                }
                else{
                    req.flash('message','Record registered!');
                    res.redirect('/');      
                }
            });
            //getting info about the email that exists(Unethical method)
            const usermail=await userSchema.findOne({email:email});
            console.log(usermail);

        }
        else{
            req.flash('message','Password not matched!');
            res.redirect('/');

        }

     }
     catch(error){
        res.render('Register',{title:'Error occurs!',password:'',email:''});
     }
});
//Log In form

Router.post('/login',(req,res)=>{
    const{
        email,
        password
    }=req.body;
    userSchema.findOne({email:email},(err,result)=>{
        if(email===result.email && password===result.password){
            res.render('dashboard',{title:'Hello World'});
        }
        else{
            
                req.flash('message','Incorrect email  or password!');
                res.redirect('/');
    
            
        }

    });
});

module.exports=Router;