const express = require("express");
const app = express();

const users = [{
  name : "John",
  kidneys: [{
    healthy: false
  }]
}];

app.use(express.json());

app.get("/", function(req,res){
  //user can check how many kidneys they have and their health
  let johnkidneys = users[0].kidneys;
  let noofkidneys = johnkidneys.length;
  let noofhealthykidneys = 0;
  
  for (let i = 0; i < noofkidneys; i++) {
    if (johnkidneys[i].healthy == true){
      noofhealthykidneys = noofhealthykidneys+1;
    }
  }

  let noofunhealthykidneys = noofkidneys - noofhealthykidneys;

  res.json({
    noofkidneys,
    noofhealthykidneys,
    noofunhealthykidneys
  })
})

app.post("/", function(req,res){
  //user can post info about new kidney
  const ishealthy = req.body.ishealthy;
  users[0].kidneys.push({
    healthy: ishealthy
  })    
  res.json({
    msg: "done!"
  })
})

app.put("/", function(req,res){
  //user can set all kidneys to healthy
  if(isthereatleastoneunhealthy()){
    for (let i = 0 ; i<users[0].kidneys.length ; i++) {
      users[0].kidneys[i].healthy = true;  
    }
    res.json({})
  }
  else(
    res.status(411).json({
      msg : "you have no unhealthy kidney"
    })
  )
})

app.delete("/", function(req,res){
  //removing all the unhealthy kidneys
  if(isthereatleastoneunhealthy()){
    const newkidneys = [];
    for (let i = 0; i < users[0].kidneys.length ; i++) {
      if(users[0].kidneys[i].healthy == true){
        newkidneys.push({
          healthy: true
        })
      }
    }
    users[0].kidneys = newkidneys;
    res.json({
      msg : "done"
    })
  }
  else{
    res.status(411).json({
      msg : "you have no bad kidneys"
    })
  }
})

function isthereatleastoneunhealthy(){
  let atleastoneunhealthy = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy == false) {
      atleastoneunhealthy = true;
    }
  }
  return atleastoneunhealthy;
}

app.listen(3004);  