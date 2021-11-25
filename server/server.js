const express = require("express");
const api = require("./routes/index");
const cors = require("cors");

const app = express();

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use("/api", api);

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
