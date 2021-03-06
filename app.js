const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
var morgan = require("morgan");
const Team = require('./api/models/team')
const User = require('./api/models/user')
// const useragent = require("express-useragent");

const database = require("./config/database");

const logResponseBody = require("./utils/logResponse");
const user = require("./api/models/user");

var app = express();

app.use(morgan("combined"));
app.set("trust proxy", 1);
var limiter = new rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message:
    "Too many requests created from this IP, please try again after an hour",
});
app.use(limiter);

// const passport_config = require("./api/config/studentGoogleAuth");

mongoose.Promise = global.Promise;

//Use helmet to prevent common security vulnerabilities
app.use(helmet());

//Set static folder
app.use("/uploads", express.static("./public"));

//Use body-parser to parse json body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(logResponseBody);

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(cors());

// app.use(useragent.express());

// if (process.env.NODE_ENV == "production") {
//   app.use((req, res, next) => {
//     if (req.useragent["isBot"] == false) {
//       next();
//     } else {
//       res.status(401).json({
//         message:
//           "Please try using a different browser: Interception is blocked",
//       });
//     }
//   });
// }

// ADD ROUTERS
app.use("/auth", require("./config/googleAuth"));
app.use("/team", require("./api/routers/team"));
app.use("/user", require("./api/routers/user"));

app.get('/finalise', async(req, res)=>{
  await Team.updateMany({},{
    finalised: true
  })
  res.send("ok")
})

app.get('/submissions', async(req, res)=>{
  await Team.find({},{ name: 1, idea: 1, submission: 1, submitted: 1 }).then((result)=>{
    let num= 0;
    let num2 = 0
    let num3 = 0;
    let arr =[]
    let secondarr= []
    let thirdarr =[]
    for(let team of result){
      if(team.submitted == true){
        num+=1;
        arr.push(team)
      }else{
        if(team.idea && team.submission){
          num2 +=1
          secondarr.push(team)
        }else{
          num3+=1
          thirdarr.push(team)
        }
      }
    }
    res.status(200).json({
      numSubmitted: num,
      numSaved: num2,
      numNothing: num3,
      submitted: arr,
      only_saved: secondarr,
      noSaveOrSubmit: thirdarr
    })
  }).catch((err)=>{

  })
})

app.get('/registrations', async(req, res)=>{
  const teams = await Team.find({})
  const users = await user.find({})
  if(teams && users){
    res.status(200).json({
      teamNumber: teams.length,
      userNumber: users.length,
      users,
      teams
    })
  }
})
// ROUTERS END

app.get("/checkServer", (req, res) => {
  return res.status(200).json({
    message: "Server is up and running",
  });
});

if (process.env.NODE_ENV == "development") {
  app.use("/dev", require("./api/routes/dev.routes"));
}

//This function will give a 404 response if an undefined API endpoint is fired
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});



app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

//Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
