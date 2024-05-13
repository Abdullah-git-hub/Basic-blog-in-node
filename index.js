const express = require("express");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
});
