const jwt = require("jsonwebtoken");
let authorModel = require("../models/authorModel")
let authorController=require("../controller/authorController")
let blogController=require("../controller/blogController")

const auth = async function(req,res, next) {
try{
  let data= req.params.authorId
  let findAuthor=await authorModel.findOne({authorId:data})
  if(!findAuthor){
    return res.status(200).send({status: false, msg: "authorId is invalid"});
  }

  let token = req.headers["x-api-key"]
if(!token)
return res.send({
  status:false,
  msz: "token Not available"
})
let decodedToken = jwt.verify(token, "group4");
if (!decodedToken){
  return res.status(403).send({status: false, msg: "token is invalid"});
}
  next()

}
catch(err){
 return res.status(500).send({status:false, msg: err.msg})
}
}

module.exports.auth=auth