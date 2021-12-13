const express = require("express");
const db = require("../config/db");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { format } = require("util");
const router = express.Router();
const serviceKey = path.join(__dirname, "../config/keys.json");

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 1000 * 1024 * 1024,
    },
});

const storage = new Storage({
    keyFilename: serviceKey,
    projectId: "bccard",
});

const bucket = storage.bucket("bccard");

// SQL
const getTeamCodeSql = "select * from team";

const getCoworkerSql =
    "select user.PID as PID, user.name as user_name, team.name as team_name from user, team where team.TID = user.TID order by team.TID, user.PID";

const checkPIDSql = "select count(*) as result from user where PID = ?";

const getFileInfoSql = "select * from file where PID = ? order by path, created_at";

const signUpSql =
    "insert into user (PID, email, password, name, TID, phone, nickname) values(?, ?, ?, ?, ?, ?, ?)";

const getUserInfoSql = "select * from user where PID = ?";

const updateUserInfoSql =
    "update user set password = ?, team = ?, phone = ?, nickname = ? where PID = ?";

const createFileSql =
    "insert into file (name, version, deadline, description, PID, path, download_link) values(?, 0, 0, 0, ?, 0, 0)";

const uploadFileSql =
    "insert into file (name, version, deadline, description, PID, path, download_link) values(?, ?, ?, ?, ?, ?, ?)";

const addCoworkerSql = "insert into coworker (PID, FID) values(?, ?);";

// 팀코드 가져오기
router.get("/team", (req, res) => {
    db.query(getTeamCodeSql, null, (err, data) => {
        if (!err) {
            console.log(data);
            res.send(data);
        } else {
            console.log(err);
            res.send("error");
        }
    });
});

// 팀원 불러오기
router.get("/coworker", (req, res) => {
    db.query(getCoworkerSql, null, (err, data) => {
        if (!err) {
            console.log(data);
            res.send(data);
        } else {
            console.log(err);
            res.send("error");
        }
    });
});

// 로그인 및 회원가입
router.post("/login", (req, res) => {
    const { PID, password } = req.query;

    db.query(checkPIDSql, PID, (err, data) => {
        if (!err) {
            if (data[0].result) {
                const checkPWSql = "select * from user where PID = ? and password = ?";

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

    const user = [
        parseInt(PID),
        email,
        password,
        name,
        parseInt(team),
        phone,
        nickname === "" ? null : nickname,
    ];

    console.log(user);

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
                        res.send("회원가입에 실패했습니다!\n다시 시도해주세요!");
                    }
                });
            }
        }
    });
});

// 마이 페이지
router.get("/my", (req, res) => {
    const PID = parseInt(req.query.PID);

    db.query(getUserInfoSql, PID, (err, data) => {
        if (!err) {
            const { PID, email, password, name, team, phone, nickname } = data[0];

            res.send({ PID, email, password, name, team, phone, nickname });
        } else {
            res.send("데이터를 가져오지 못햇습니다!");
        }
    });
});

router.post("/my", (req, res) => {
    const { PID, password, team, phone, nickname } = req.query;

    db.query(
        updateUserInfoSql,
        [password, parseInt(team), phone, nickname, parseInt(PID)],
        (err, data) => {
            if (!err) {
                res.send("success");
            } else {
                res.send("fail");
            }
        }
    );
});

// About FILE
router.get("/files", (req, res) => {
    const PID = parseInt(req.query.PID);

    db.query(getFileInfoSql, PID, (err, data) => {
        if (!err) {
            const directory = new Map();
            const result = {};

            data.map((info) => {
                if (info.path === 0) {
                    // root
                    const { FID, ...rest } = info;

                    directory.set(FID, {
                        ...rest,
                        child: [],
                    });
                } else if (directory.has(info.path)) {
                    // child
                    const { FID, ...rest } = info;
                    const { child, ...parentInfo } = directory.get(info.path);

                    directory.set(FID, {
                        ...rest,
                        child: [],
                    });

                    directory.set(info.path, {
                        ...parentInfo,
                        child: [...child, info],
                    });
                }
            });

            for (const [k, v] of directory) {
                result[k] = v;
            }

            res.send(result);
        } else {
            res.send("fail");
        }
    });
});

// Create File
router.post("/create", (req, res) => {
    const PID = parseInt(req.query.PID);
    const fileName = req.query.fileName;

    db.query(createFileSql, [fileName, PID], (err, data) => {
        if (!err) {
            res.send("success");
        } else {
            res.send("error");
        }
    });
});

// Upload File
router.post("/upload", multer.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on("error", (err) => {
            res.status(500).send({ message: err.message });
        });

        blobStream.on("finish", async (data) => {
            // create a url to access file
            const publicURL = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

            try {
                await bucket.file(req.file.originalname).makePublic();
            } catch {
                return res.status(500).send({
                    message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                    url: publicURL,
                });
            }

            const PID = parseInt(req.query.PID);
            const { fileName, version, date, description, parent, coworkers } = req.query;

            db.query(
                uploadFileSql,
                [fileName, version, date, description, PID, parseInt(parent), publicURL],
                (err, data) => {
                    if (!err) {
                        const coworker = JSON.parse(coworkers);

                        for (const key in coworker) {
                            db.query(addCoworkerSql, [parseInt(key), parseInt(parent)]);
                        }

                        res.send("success");
                    } else {
                        console.log(err);
                        res.send("error");
                    }
                }
            );

            // res.status(200).send({
            //     message: "Uploaded the file successfully: " + req.file.originalname,
            //     url: publicURL,
            // });
        });
        blobStream.end(req.file.buffer);
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 25MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
});

module.exports = router;
