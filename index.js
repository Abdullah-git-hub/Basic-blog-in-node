const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const {
    checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = 3000;
mongoose
    .connect("mongodb://127.0.0.1:27017/arablog")
    .then((_) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(checkForAuthenticationCookie("token"));

app.use("/blog", blogRoute);
app.use("/user", userRoute);
app.get("/", (req, res) => {
    res.render("home", {
        user: req.user,
    });
});

app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
});
