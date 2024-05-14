require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const {
    checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGO_URL)
    .then((_) => console.log("MongoDB Connected"));
// .connect("mongodb://127.0.0.1:27017/arablog")

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(checkForAuthenticationCookie("token"));

app.use("/blog", blogRoute);
app.use("/user", userRoute);
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
});
