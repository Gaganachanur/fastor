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
 
//schemas------
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
 //----------------- 

// 1)API for Employee login/register.  get data from frontend check if the emp is present is there are and send responce 
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

// 2) Public form API must be accessible without any authentication. get all the data of form (also which are yet be claimed by employee)
// 4) API to fetch unclaimed leads.
app.get("/publicinfo", async(req, res) => {
       await Publicrecord.find({})
      .then((responce)=>{
        console.log(res.json(responce))
      })
      .catch((e)=>console.log(e)) 
});

// 3) API to claim leads. onclick event from front we will get which employee want to claim , 
 // he will add it to his crm account and remove from public account 
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
//delet from public 
Publicrecord.deleteMany({ name: reqName }).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
res.json('data added succesfully')
})

//5) API to fetch leads claimed by logged in users. get the data of employee who has log in and info from his crmdatabase form claimed by him
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
