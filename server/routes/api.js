const express = require("express");
const db = require("../config/db");
const router = express.Router();

const checkPIDSql = "select count(*) as result from user where PID = ?";

router.get("/login", (req, res) => {
	res.send({ data: "qwer" });
});

router.post("/login", (req, res) => {
	const { PID, password } = req.query;

	db.query(checkPIDSql, PID, (err, data) => {
		if (!err) {
			if (data[0].result) {
				const checkPWSql =
					"select * from user where PID = ? and password = ?";

				db.query(checkPWSql, [PID, password], (err, data) => {
					if (!err) {
						if (!data[0]) {
							res.send("비밀번호가 일치하지 않습니다!");
						} else {
							res.send(data[0]);
						}
					} else {
						res.send("에러가 발생했습니다!");
					}
				});
			} else {
				res.send("등록되지 않은 회원입니다!");
			}
		} else {
			res.send("에러가 발생했습니다!");
		}
	});
});

router.post("/signup", (req, res) => {
	const { PID, password, name, email, team, phone, nickname } = req.query;

	const signUpSql =
		"insert into user (PID, email, password, name, team, phone, nickname) values(?, ?, ?, ?, ?, ?, ?)";

	const user = [
		parseInt(PID),
		email,
		password,
		name,
		parseInt(team),
		phone,
		nickname === "" ? null : nickname,
	];

	// PID 중복 체크
	db.query(checkPIDSql, PID, (err, data) => {
		if (!err) {
			if (data[0].result) {
				res.send("duplicated");
			} else {
				db.query(signUpSql, user, (err, data) => {
					if (!err) {
						res.send("success");
					} else {
						res.send(
							"회원가입에 실패했습니다!\n다시 시도해주세요!",
						);
					}
				});
			}
		}
	});
});

router.get("/my", (req, res) => {
	const PID = parseInt(req.query.PID);

	const getUserInfoSql = "select * from user where PID = ?";

	db.query(getUserInfoSql, PID, (err, data) => {
		if (!err) {
			const { PID, email, password, name, team, phone, nickname } =
				data[0];

			res.send({ PID, email, password, name, team, phone, nickname });
		} else {
			console.log(err);
			res.send("데이터를 가져오지 못햇습니다!");
		}
	});
});

router.post("/my", (req, res) => {
	const { PID, password, team, phone, nickname } = req.query;

	const updateUserInfoSql =
		"update user set password = ?, team = ?, phone = ?, nickname = ? where PID = ?";

	db.query(
		updateUserInfoSql,
		[password, parseInt(team), phone, nickname, parseInt(PID)],
		(err, data) => {
			if (!err) {
				res.send("success");
			} else {
				res.send("fail");
			}
		},
	);
});

module.exports = router;
