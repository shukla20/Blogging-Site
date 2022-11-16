/*const blogModel = require("../models/blogModel");

const updatedBlog = async function(req,res)
let updatedBlog = await blogModel.findOneAndUpdate (
{id: blogId},
{
    $set{
        title: 
        body:
        category:
        publishedAt: new Date[],
        isPublished: true
    }
    $push: {tags: req.body.tags, subcategory: req.body.subCategory}
},
{new: true, upsert: true}
return res.status(200).send
    try{
        let blogId = req.params.blogId;
        let blog = await blogModel.findById(blogId);
        if(!blog){
            return res.status(400).send("noo blog details");
        }
        let blogData = req.body;
        let upDatedBlog = await blogModel.findOneAndUpdate({_id: blogId},{isDeleted: false})
        res.status(200).send({status: "updated data", data: updatedBlog});
    }
    catch(err){
        res.status(400).send(status:false, msg:err)
    }

*/

//UPDATE
const blogModel = require("../models/blogModel");

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

const deleteBlogBy=async function(req,res){
    try{
        let query= {}
        query= req.query
        let authorId=query.authorId
        query ={authorId:authorId}
        
        let filterTheBlog= await blogModel.find(query)
        if(!filterTheBlog){
            res.status(404).send({ status: false, msg: "blog document does'nt exist" })
        }

         if(filterTheBlog.isDeleted==true){
          res.status(404).send({ status: false, msg: "blog is deleted" })
         }
         
        let findToDelete= await blogModel.findOneAndUpdate(
            query,
            {$set:{isDeleted:true, isPublished:false}},
            {new:true})            
                res.status(404).send({ status: true, msg: findToDelete })
        }
    
    
catch (err) {
      res.status(500).send({ status: false, msg: err.message })//error
    }
}

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


module.exports.getBlog = getBlog;
module.exports.updatedBlog = updatedBlog;
module.exports.deleteBlog=deleteBlog
module.exports.deleteBlogBy=deleteBlogBy

