const blogModel = require("../models/blogModel")
const Valid = require("../validator/validator")
// const { isValidObjectId } = require("mongoose")
const authorModel = require("../models/authorModel")



const createBlog = async function (req, res) {

    try {
        let Data = req.body
        let Id = req.body.authorId
        const { title, body, authorId, category } = Data
        const objKey = Object.keys(Data).length


        //-----------------------Data in body || not-------------------------------

        if (objKey === 0) { return res.status(400).send({ status: false, msg: "No Data in Body" }) }

        //-----------------------All varibles valibation-------------------------------

        else if (!title) { return res.status(400).send({ status: false, msg: "Title is required" }) }

        else if (!body) { return res.status(400).send({ status: false, msg: "Body is required" }) }

        else if (!authorId) { return res.status(400).send({ status: false, msg: "AuthorId is required" }) }

        else if (!category) { return res.satus.send({ status: false, msg: "Email is Category" }) }


        const validId = await authorModel.findById(Id)
        if (validId) {
            const blogCreated = await blogModel.create(Data)
            return res.status(201).send({ status: true, msg: 'blog created succesfully ', data: blogCreated })

        } else { res.status(400).send({ statusbar: false, msg: 'invalid authorid' }) }
    }

    catch (err) {

        return res.status(500).send({ status: false, msg: err.msg })

    }

}
//UPDATE
//const blogModel = require("../models/blogModel");


const updatedBlog = async (req, res) => {
    try {
        let alldata = req.body;
        if (Object.keys(alldata).length == 0) {
            return res.status(400).send({ status: false, msg: "No data provied" });
        }

        let blogId = req.params.blogId
        if (!blogId) { return res.status(400).send({ status: false, msg: "No blogid" }); }

            let findBlogId = await blogModel.findById(blogId);
            if(findBlogId.isDeleted == true){
            return res.status(400).send({status: false, msg:"blogid deleted"});
        }


        let updatedBlog = await blogModel.findOneAndUpdate(
            { id: blogId },
            {
                $set: {
                    title: alldata.title,
                    body: alldata.body,
                    category: alldata.category,
                    publishedAt: new Date(),
                    isPublished: alldata.isPublished
                },
                $push : {tags: req.body.tags},
        $push : {subcategory: req.body.subCategory}
            },
            { new: true }
        )

        // $push : {tags: req.body.tags},
        // $push : {subcategory: req.body.subCategory}
        // , upsert: true

        return res.status(200).send({ status: true, msg: updatedBlog });

    } catch (err) {
        res.status(404).send({ status: false, msg: err.message });
    }
};


//const blogModel = require("../models/blogModel");


//

//=======get api==========




const getBlog = async function (req, res) {
  try {
      let data = req.query
      if (!data) return res.status(400).send({ status: false, msg: "Please provide details in query" })
      let getBlog = await blogModel.find({ isPublished: true, isDeleted: false })
      if (!getBlog) return res.status(404).send({ status: false, msg: "No blog found" })
      return res.status(200).send({ satus: true, msg: getBlog })
  }
  catch (error) {
      return res.status(500).send({ msg: error.message })
  }
}



//delete


const deleteBlog=async function(req,res){
    
    try{

        let blog= req.params.blogId
            let findBlog= await blogModel.findOne({_id:blog,isDeleted:false})
            //console.log(blog)
        //   let blogid=findBlog._id

            if(!findBlog){
                res.status(404).send({ status: false, msg: "blog document doesn't exist" })
            }

            if(findBlog.isDeleted==true){
                res.status(404).send({ status: false, msg: "blog is deleted" })
            }
            else{
            const findToDelete= await blogModel.findOneAndUpdate(
                {_id:findBlog},
                {$set:{isDeleted:true}},
                {new:true})
                res.status(200).send({ status: true, msg: findToDelete })
        }
    
    }
catch (err) {
      res.status(500).send({ status: false, msg: err.message })
    }
}

const deleteBlogBy=async function(req,res){
    try{
        let data = req.query
        data.isDeleted=false
                
        let filterTheBlog= await blogModel.find(data)
        if(filterTheBlog.length==0){
           return res.status(404).send({ status: false, msg: "blog document does'nt exist" })
        } 

        let findToDelete= await blogModel.findOneAndUpdate(data,
            {$set:{isDeleted:true}},
            {new:true}) 

              return  res.status(200).send({ status: true, msg: findToDelete })
        }
    
    
catch (err) {
      res.status(500).send({ status: false, msg: err.message })//error
    }
}




module.exports.createBlog = createBlog ;
module.exports.getBlog = getBlog;
module.exports.updatedBlog = updatedBlog;
module.exports.deleteBlog=deleteBlog
module.exports.deleteBlogBy=deleteBlogBy

