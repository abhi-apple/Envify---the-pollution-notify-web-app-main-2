const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static('public'))
app.use("/css", express.static(__dirname + 'public/css'))
app.use("/js", express.static(__dirname + 'public/js'))
app.use("/images", express.static(__dirname + 'public/images'))

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});



app.listen(process.env.PORT || 3000, function() {
    console.log("server started at host 3000");

})