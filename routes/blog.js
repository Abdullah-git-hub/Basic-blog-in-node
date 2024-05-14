const { Router } = require("express");
const Blog = require("../models/blog");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/uploads/${req.user._id}`);
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + file.fieldname;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/add-new", (req, res) => {
    res.render("addBlog", {
        user: req.user,
    });
});

router.post("/", upload.single("coverImg"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.redirect("/");
});

module.exports = router;
