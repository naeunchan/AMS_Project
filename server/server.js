const express = require("express");
const api = require("./routes/index");
const db = require("./config/db");

const PORT = 8000;

const app = express();

app.use("/api", api);
app.use("/api/db", (req, res) => {
	db.query("SELECT * FROM USER", (error, data) => {
		if (!error) {
			res.send({
				user: data,
			});
		} else {
			res.send(error);
		}
	});
});

app.listen(PORT, () => console.log(`Listening on ${PORT} port..!`));
