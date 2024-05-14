const { Router } = require("express");
const multer = require("multer");

const router = Router();

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/uploads`);
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    res.render("addBlog", {
        user: req.user,
    });
});

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    res.render("blog", {
        user: req.user,
        blog,
    });
});

router.post("/comment/:blogId", async (req, res) => {
    await Comment.create({
        content: req.body.content,
        createdBy: req.user._id,
        blogID: req.params.blogId,
    });

    res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("coverImg"), async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
        title,
        body,
        coverImgURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    });
    res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
