const express = require("express");
const mongoose = require("mongoose");
const app = express();
  
mongoose.connect("mongodb://127.0.0.1:27017/crm",{
        useNewUrlParser: true,
        useUnifiedTopology: true   
})
.then(() => {
    console.log(`CONNECTED TO MONGO!`);
})
.catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
})
  
const logInnSchema = new mongoose.Schema({
  name:String,
  email: String,
  pass:String, 
  crmacct: String,
});

const employeedLogs = mongoose.model("Employeedata", logInnSchema);

const publicSchema = new mongoose.Schema({
    name:String,
    email: String,
    courceIntrest:String
  });
  
  let Publicrecord = mongoose.model("publiccrmrecord", publicSchema);

  const emp1Schema = new mongoose.Schema({
    name:String,
    email: String,
    courceIntrest:String
  });
  
  let Emp1record = mongoose.model("employee1record", emp1Schema);
  

app.get("/logs", async(req, res) => {

let reqName ='jhon';
let reqEmail = 'jhon@fastor.com';
let reqPass = '1234';
   
   await employeedLogs.find({name:reqName,pass:reqPass})
  .then((responce)=>{
    console.log(res.json(responce))
  })
  .catch((e)=>console.log(e))
 
});

app.get("/publicinfo", async(req, res) => {
 
       await Publicrecord.find({})
      .then((responce)=>{
        console.log(res.json(responce))
      })
      .catch((e)=>console.log(e))
     
});

app.post('/claimleads',(req,res)=>{
    
let reqName ='laxmi';
let reqEmail = 'laxmi@fastor.com';
let reqcourceIntrest = 'telugu';

const emprecord = new Emp1record({

    name:reqName,
    email: reqEmail,
    courceIntrest:reqcourceIntrest
})
emprecord.save(function (err, doc) {
    console.log(doc._id);
});

Publicrecord.deleteMany({ name: reqName }).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
res.json('data added succesfully')

})


app.get("/getemp1rec", async(req, res) => {
 
    await Emp1record.find({})
   .then((responce)=>{
     console.log(res.json(responce))
   })
   .catch((e)=>console.log(e))
  
});

  
app.listen(3000, function(){
    console.log("App is running on Port 3000");
});