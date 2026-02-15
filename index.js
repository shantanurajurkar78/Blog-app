const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./model/blog")

mongoose.connect("mongodb://localhost:27017/blogify").then(()=> console.log("MongoDb connected"));

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog")
const { checkforAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkforAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.get("/", async (req,res)=>{
    const allBlog =await Blog.find({});
     res.render("home", {
        user: req.user,
        blogs: allBlog,
    });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT,() => console.log(`Server started at Port ${PORT}`));