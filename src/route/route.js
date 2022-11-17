const express = require('express');
const router = express.Router();
const controller = require("../controller/authorController")
const controller1 = require("../controller/blogController")
const middleware1 = require("../middleware/middleware")


router.post("/createAuthor", controller.createAuthor)

router.post("/login", controller.login) 

router.post("/createBlog/:authorId", middleware1.auth, controller1.createBlog)

router.get("/blogs/:authorId", middleware1.auth, controller1.getBlog)

router.put("/updatedBlog/:blogId/:authorId",middleware1.auth, controller1.updatedBlog)

router.delete("/deleteBlog/:authorId", middleware1.auth, controller1.deleteBlog)

router.delete("/deleteBlogBy/:authorId", middleware1.auth, controller1.deleteBlogBy)

module.exports = router;