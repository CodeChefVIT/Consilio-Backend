const Team = require('../models/team')
const User = require('../models/user')


exports.make = async (req,res)=>{

  const {name,bio} = req.body
  const {userId} = req.user
  if(!name){
    return res.status(400).json({
      message:"Name not provided"
    })
  }
  else{
User.findById(userId).then((user)=>{
  if(user){
    return res.status(403).json({
      message:"Already in a team"
    })
  }

  else{
    Team.findOne({name}).then((team)=>{
      if(team){
        return res.status(403).json({
          message:"Team name take, use new team name"
        })
      }
      else{
        for (var i = 0; i < 5; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
        const code = text.toUpperCase();
        
        const team = new Team({
          _id: new mongoose.Types.ObjectId(),
          name,
          bio,
          code,
        })
      
          team.save().then((team)=>{
            Team.updateOne({_id:team._id},{leader:userId,$addToSet:{users:userId}})
              .then(()=>{
                User.updateOne({_id:userId},{inTeam:true,team:team._id})
                  .then(()=>{
                    res.status(201).json({
                      message:'Team created'
                    })
                  }).catch((e)=>{
                    res.status(400).json({
                      error:e.toString()
                    })
          
              })
          })
      }).catch((e)=>{
        res.status(400).json({
          error:e.toString()
        })
      })
    }
  
}).catch((e)=>{
  res.status(400).json({
    error:e.toString()
  })
})
  }

}).catch((e)=>{
  res.status(400).json({
    error:e.toString()
  })
  })
}
}

exports.join = async (req,res)=>{
  const {code} = req.body;
  const {userId} = req.user;
  
  User.findById(userId).then((user)=>{
    if(user.inTeam){
      return res.status(403).json({
        message:"Already in a team"
      })
    }
    else{
      Team.findOne({code}).then((team)=>{
        if(users.length>=2){
          return res.status(403).json({
            message:"Team length full"
          })
        }
        else{
          Team.findOneAndUpdate({code:code},{$addToSet:{users:userId}})
            .then((team)=>{
              User.updateOne({_id:userId},{inTeam:true,team:team._id})
                .then(()=>{
                  res.status(201).json({
                    message:'Successfully joined team'
                  })
                })
            })
        }
        
      })
    }
  })
}
