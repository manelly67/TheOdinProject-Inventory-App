const express = require("express");
const port = process.env.PORT || 3000;
const path = require("node:path");


// express app
const app = express();

// middleware and to serve static assets
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));  // si no se utiliza esta middleware el post object resulta undefined

// to define the view engine and path
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
}); 