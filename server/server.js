const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const api = require("./routes/index");
const db = require("./config/db");

const PORT = 8000;

dotenv.config();

const app = express();

app.use(cors());

// show log
app.use(morgan("dev"));

// for body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 쿠키 해석 후 req.cookies 객체로 만듦
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET,
		cookie: {
			httpOnly: true, // 쿠키 조작 방지
			secure: false, // https일 경우에만 쿠키 전송
		},
		name: "session-cookie",
	}),
);

app.use("/api/auth/login", (req, res) => {
	res.send({
		token: "q1w2e3r4",
	});
});

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
