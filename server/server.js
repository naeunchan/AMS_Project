const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

// Router
const api = require("./routes/api");

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

app.use("/api", api);

app.use((req, res, next) => {
	res.status(404).send("Not Found");
});

// app.use("/api/auth/login", (req, res) => {
// 	res.send({
// 		token: "q1w2e3r4",
// 	});
// });

// app.use("/api/db", (req, res) => {
// 	db.query("SELECT * FROM USER", (error, data) => {
// 		if (!error) {
// 			res.send({
// 				user: data,
// 			});
// 		} else {
// 			res.send(error);
// 		}
// 	});
// });

app.use((req, res, next) => {
	const error = new Error(`${req.method} ${req.rul} 라우터가 없습니다.`);
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
	res.status(err.status || 500);
	res.render("error");
});

app.listen(PORT, () => console.log(`Listening on ${PORT} port..!`));
