let authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken");
let valid = require("../validator/validator")


let createAuthor = async function (req, res) {
    let Data = req.body
    const { fname , lname , title , email , password } = Data
    const isEmailAlreadyused = await authorModel.findOne({ email: email })
    const objKey = Object.keys(Data).length
    try {

 //-----------------------Data in body || not-------------------------------

        if (objKey === 0)
         { return res.status(400).send({ status: false, msg: "No Data in Body" }) }

 //-----------------------All varibles valibation-------------------------------

        else if (!fname) 
        { return res.status(400).send({ status: false, msg: "fname is required" }) }

        else if (!lname)
        { return res.status(400).send({ status: false, msg: "Lname is required" }) }

        else if (!title) 
        { return res.status(400).send({ status: false, msg: "Title is required" }) }

        else if (!email) 
        { return res.status(400).send({ status: false, msg: "Email is required" }) }

        else if (!password) 
        { return res.status(400).send({ status: false, msg: "Password is required" }) }

        //--------------------- Email validation --------------------------

        else if (!valid.isValidEmail(email))
         { return res.status(400).send({ status: false, msg: "Email is not vaild" })}

        else {
            let createAuthor = await authorModel.create(Data)
            res.status(201).send({ status: true, msg: createAuthor })
        }
    }
    catch (error) {
        res.status(500).send({ msz: "Error", error: error.message })
    }
}


const login=async function(req, res){
    try{
        let email1=req.body.email
    let password1=req.body.password
    
    let loginByEmailPassword = await authorModel.findOne({email:email1, password:password1})
    
    if(!loginByEmailPassword){
        return res.status(404).send({status:false, msg:"email and password are incorrect"})
    }
    
    let token=jwt.sign(
        {
            login:loginByEmailPassword._id.toString()
        },
        'group4'
    )
    res.setHeader("x-api-key", token);
    res.status(401).send({status:true, msg:token})
    }
    catch(err){
        res.status(500).send({status:false, msg:err.msg})
    }
}
    
module.exports.login=login

module.exports.createAuthor = createAuthor