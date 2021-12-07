const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/login", (req, res) => {
	res.send({ data: "qwer" });
});

router.post("/login", (req, res) => {
	const { PID, password } = req.query;

	const checkPIDSql = "select count(*) as result from user where PID = ?";

	db.query(checkPIDSql, PID, (err, data) => {
		if (!err) {
			if (data[0].result < 1) {
				res.send("등록되지 않은 회원입니다!");
			} else {
				const checkPWSql =
					"select * from user where PID = ? and password = ?";

				db.query(checkPWSql, [PID, password], (err, data) => {
					if (!err) {
						console.log(data);
						if (!data[0]) {
							res.send("비밀번호가 일치하지 않습니다!");
						} else {
							res.send(data[0]);
						}
					} else {
						res.send("에러가 발생했습니다!");
					}
				});
			}
		} else {
			res.send("에러가 발생했습니다!");
		}
	});
});

module.exports = router;
