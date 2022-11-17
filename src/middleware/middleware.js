const jwt = require("jsonwebtoken");
const author=require("../middleware/middleware")


const auth = async function(req,res, next) {
try{token = req.headers["x-api-key"]
if(!token)
return res.send({
  status:false,
  msz: "token Not available"
})
let decodedToken = jwt.verify(token, "group4");
if (!decodedToken){
  return res.status(403).send({status: false, msg: "token is invalid"});

  next()
}
}
catch(err){
 return res.status(500).send({status:false, msg: err.msg})
}
}

module.exports.auth=auth