const express = require('express');
const router = express.Router();
const controller = require("../controller/authorController")
const controller1 = require("../controller/blogController")

const middleware1 = require("../middleware/middleware")


router.post("/createAuthor", controller.createAuthor)
router.post("/createBlog", controller1.createBlog)
router.put("/updatedBlog", controller1.updatedBlog)
router.put("/updatedBlog/:blogId", controller1.updatedBlog)
router.get("/blogs", controller1.getBlog)
router.delete("/deleteBlogBy", middleware1.auth, controller1.deleteBlogBy)

module.exports = router;