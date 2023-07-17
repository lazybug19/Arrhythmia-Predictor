
const express = require("express");
const fs = require('fs');
const pathe = require('path');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage })


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  username : String,
  password: String,
  type: String,
});

const User = new mongoose.model("User", userSchema);




app.get("/",function(req,res){
  res.render("home");
});
app.get("/doctor/:username",function(req,res){
  const username = req.params.username;
  const data = JSON.parse(fs.readFileSync("./uploads/"+username+".json"));
  res.render("chart", { data: data , username:username, libs: ['lcjs.iife','xydata.iife']});
});
app.get("/login",function(req,res){
  res.render("login");
});
app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    username : req.body.username,
    type: req.body.type,
  });
  newUser.save()
  .then(()=> {
    res.render("login");
  })
  .catch((err)=>{console.log(err);}); 
});

app.post("/login",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email : username})
  .then((founduser) => {
    if(founduser)
    {
      if(founduser.password === password && founduser.type === "doctor")
      {res.render("doctor");}
      if(founduser.password === password && founduser.type === "patient")
      {res.render("patient");}
    }
    else{
      res.render("login");
    }

  })
  .catch((err)=>{console.log(err);}); 
});

app.post("/doctor",function(req,res){
  const useremail = req.body.useremail;
  User.findOne({email : useremail})
  .then((founduser) => {
    if(founduser)
    {
      // after finding user.
      const fname = founduser.username;
      res.redirect("/doctor/"+fname);
    }
    else{
      res.render("doctor");
    }
  })
  .catch((err)=>{console.log("this error"+err);}); 
});

app.post('/patient', upload.single('data'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.render('login');
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});



