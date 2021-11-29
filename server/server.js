const express = require("express");
const api = require("./routes/index");
const db = require("./config/db");

const PORT = 8000;

const app = express();

// app.use("/api", api);

app.listen(PORT, () => console.log(`Listening on ${PORT} port..!`));
