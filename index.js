const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("client/build"));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.get("/", (req, res) => {
    res.sendFile("/index.html", { root: __dirname });
});

// create a GET route
app.get("/express_backend", (req, res) => {
    res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});
