const express = require("express");
const db = require("../config/db");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const router = express.Router();
const serviceKey = path.join(__dirname, "../config/keys.json");
const fetch = require("node-fetch");
const crypto = require("crypto");

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

const configureBucketCors = async () => {
    await storage.bucket("bccard").setCorsConfiguration([
        {
            maxAgeSeconds: 3600,
            method: ["PUT", "GET", "POST", "DELETE"],
            origin: ["http://localhost:8000", "http://localhost:3000"],
            responseHeader: [
                "Content-Type",
                "Authorization",
                "Access-Control-Allow-Origin",
                "x-goog-resumable",
            ],
        },
    ]);
};

configureBucketCors();

router.post("/upload", multer.single("file"), async (req, res) => {
    const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000,
        contentType: "application/octet-stream",
    };

    res.set("Access-Control-Allow-Origin", "http://localhost:3000");

    const { version, password, description, FID, coworkers } = req.query;

    const PID = parseInt(req.query.PID);

    crypto.randomBytes(64, async (err, buf) => {
        const fileName = req.file.originalname;
        const salt = buf.toString("base64");
        const [url] = await storage.bucket("bccard").file(fileName).getSignedUrl(options);

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/octet-stream",
            },
            body: req.file.buffer,
        });

        crypto.pbkdf2(fileName, salt, 10000, 64, "sha512", (err, key) => {
            db.query(
                uploadFileSql,
                [fileName, version, password, description, PID, parseInt(FID), salt],
                (err, data) => {
                    if (!err) {
                        const FID = data.insertId;
                        const coworker = JSON.parse(coworkers);

                        for (const key in coworker) {
                            db.query(addCoworkerSql, [parseInt(key), parseInt(FID)]);
                        }

                        res.send("success");
                    } else {
                        console.log(err);
                        res.send("error");
                    }
                }
            );
        });
    });
});

router.post("/download", async (req, res) => {
    const { fileName } = req.query;

    const options = {
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000,
    };

    const [url] = await storage.bucket("bccard").file(fileName).getSignedUrl(options);
    res.send(url);
});

// 다운로드 카운팅 업데이트
router.post("/count", async (req, res) => {
    const { FID, count } = req.query;

    db.query(updateCount, [count, parseInt(FID)], (err, data) => {
        if (!err) {
            res.send("success");
        } else {
            res.send("error");
        }
    });
});

// SQL
const getTeamCodeSql = "select * from team";

const getCoworkerSql =
    "select user.PID as PID, user.name as user_name, team.name as team_name from user, team where team.TID = user.TID order by team.TID, user.PID";

const checkPIDSql = "select count(*) as result from user where PID = ?";

const getFileInfoSql = "select * from file where PID = ? order by path, created_at";
const getFileTeamInfoSql =
    "select * from COWORKER, FILE where COWORKER.PID = ? and coworker.FID = FILE.FID";
const getRootFileSql = "select * from FILE where path = 0";

const getSelectedFileInfoSql = "select * from where FID = ? and PID = ? order by created_at";

const signUpSql =
    "insert into user (PID, email, password, name, TID, phone, nickname) values(?, ?, ?, ?, ?, ?, ?)";

const getUserInfoSql = "select * from user where PID = ?";

const updateUserInfoSql =
    "update user set password = ?, team = ?, phone = ?, nickname = ? where PID = ?";

const createFileSql =
    "insert into file (name, version, password, description, PID, path, download_link) values(?, 0, 0, 0, ?, 0, 0)";

const uploadFileSql =
    "insert into file (name, version, password, description, PID, path, download_link) values(?, ?, ?, ?, ?, ?, ?)";

const addCoworkerSql = "insert into coworker (PID, FID) values(?, ?);";

const getAllUserInfoSql = "select * from user;";

const getCoworkersInFileSql = "select PID from coworker where FID = ?";

const updateCount = "update file set count = ? where FID = ?";

router.get("/users", (req, res) => {
    db.query(getAllUserInfoSql, null, (err, data) => {
        if (!err) {
            const users = {};

            data.forEach((user) => {
                const { PID, ...rest } = user;
                users[PID] = rest;
            });
            res.send(users);
        }
    });
});

//참조된 팀원 정보
router.get("/file/coworker", (req, res) => {
    const FID = parseInt(req.query.FID);

    db.query(getCoworkersInFileSql, FID, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log("getCoworkerInFileSql Error!");
            res.send("error");
        }
    });
});

// 팀코드 가져오기
router.get("/team", (req, res) => {
    db.query(getTeamCodeSql, null, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
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
    const info = [];

    db.query(checkPIDSql, PID, (err, data) => {
        if (!err) {
            if (data[0].result) {
                const checkPWSql = "select * from user where PID = ? and password = ?";

                db.query(checkPWSql, [PID, password], (err, data) => {
                    if (!err) {
                        if (!data[0]) {
                            res.send("비밀번호가 일치하지 않습니다!");
                        } else {
                            info.push(data[0]);

                            res.send(info);
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
const DFS = (data) => {
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

    return result;
};

router.get("/files", (req, res) => {
    const PID = parseInt(req.query.PID);
    let result = {};

    db.query(getRootFileSql, null, (err, data) => {
        if (!err) {
            const allFiles = data;

            db.query(getFileInfoSql, PID, (err, data) => {
                if (!err) {
                    result = DFS([...allFiles, ...data]);
                    db.query(getFileTeamInfoSql, PID, (err, data) => {
                        if (!err) {
                            const rest = { ...result };

                            result = DFS([...allFiles, ...data]);

                            for (const k in result) {
                                if (!rest[k]) {
                                    rest[k] = result[k];
                                } else if (rest[k].child.length < result[k].child.length) {
                                    rest[k] = result[k];
                                }
                            }

                            res.send({ ...rest });
                        }
                    });
                }
            });
        }
    });
});

router.get("/application", (req, res) => {
    const PID = parseInt(req.query.PID);
    const FID = parseInt(req.query.FID);

    db.query(getSelectedFileInfoSql, [FID, PID], (err, data) => {
        if (!err) {
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

module.exports = router;
