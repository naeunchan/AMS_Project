const express = require("express");
const app = express();
const test = require("./routes/index");

app.use("/api", test);

const port = 8000;

app.listen(port, () => console.log(`port : ${port}`));
