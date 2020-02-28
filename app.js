//jshint esversion:6
const express=require("express");
const bodyParser = require("body-parser");
const request =require("request");

const app=express();
  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
var fname=req.body.fn;
var lname=req.body.ln;
var email=req.body.em;
var data={
  members:[{
    email_address:email,
    status: "subscribed",
    merge_fields:{
      FNAME:fname,
      LNAME:lname
    }
  }]

};
var jsondata=JSON.stringify(data);
var options={
  url: "https://us19.api.mailchimp.com/3.0/lists/88fcf19a55",
  method:"POST",
  headers:{
    "Authorization":"Dilaxn128 3a77c22da7b69966c2bc914ba189761b-us19"
  },
  body:jsondata
};
request(options,function(error,response,body){
if(error){
//  console.log(error);
res.sendFile(__dirname+"/fail.html");
}
else{
console.log(response.statusCode);
if(response.statusCode==200)
res.sendFile(__dirname+"/success.html");
else
res.sendFile(__dirname+"/fail.html");

}
})
});
app.post("/fail",function(req,res){
  res.redirect("/");
})
app.listen(3000,function(){
  console.log("Server is running on port 3000");
})

//3a77c22da7b69966c2bc914ba189761b-us19

//list id 88fcf19a55
