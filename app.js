const express=require('express');//js framework which provides different modules
const mongose=require('mongoose');//Used for db connection
const bodyParser=require('body-parser');
const homeRouter=require('./routers/homerouter');
const session=require('express-session');
const cookie=require('cookie-parser');
const flash=require('connect-flash');
const cookieParser = require('cookie-parser');

//Getting port to run app
const port=process.env.port || 3000;//Getting an empty port by itself when application runs or run on local hosy 3000
const app=express();//storing all features of express into app

//Database Connection
mongose.connect('mongodb://localhost:27017/CRUD',{useNewUrlParser:true});
const db=mongose.connection;
//For checking connection error
db.on('error',()=>{console.log('Error in connection');});
db.once('open',()=>{console.log('Database Connected!');});
//Plugins for bodyparser
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//creating view engine for running html and css files

//using or accessing folders

app.use(session({
    secret:'secret',
    cookie:{maxAge:6000},
    resave:false,
    saveUninitialized:false
}));
app.use(flash());
app.set('view engine','ejs');
app.use('/',homeRouter);
//app.use(express.static('public'));
app.listen(port);
