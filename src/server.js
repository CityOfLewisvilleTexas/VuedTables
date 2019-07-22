const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

let app = express();
app.use(cors());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.send('hello world')
// });

app.get("/export", (req, res, next) => {
    res.send(//handle JSON payload here 
        [{ "json": "true" }])
});

app.listen(8081, () => {
  console.log("listening to port localhost:8081");
});
