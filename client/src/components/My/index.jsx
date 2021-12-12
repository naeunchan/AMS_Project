import React, { useState, useEffect } from "react";
import { Button, Modal } from "@components";
import styled from "@emotion/styled";
import styles from "@style";
import Swal from "sweetalert2";
import axios from "axios";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Title = styled.div`
    display: flex;
    font-size: 35px;
    font-weight: bold;
    margin: 30px 0 20px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin-top: 50px;

    @media ${styles.media.sm} {
        width: 100%;
        flex-direction: column;
        align-items: center;
        font-size: ${styles.fontStyle.small};

        Button:nth-of-type(1) {
            margin-bottom: 10px;
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
    },
    margin: {
        margin: "10px 0",
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: "25ch",
    },
}));

const My = ({ onClick, ...props }) => {
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState(null);
    const PID = parseInt(sessionStorage.getItem("PID"));
    const [showPW, setShowPW] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPW(!showPW.showPassword);
    };

    const handleChangePW = (event) => {
        setUserInfo({ ...userInfo, password: event.target.value });
    };

    const handleChangeTeam = (event) => {
        setUserInfo({ ...userInfo, team: event.target.value });
    };

    const handleChangePhone = (event) => {
        setUserInfo({ ...userInfo, phone: event.target.value });
    };

    const handleChangeNickname = (event) => {
        setUserInfo({ ...userInfo, nickname: event.target.value });
    };

    const handleClickEditButton = () => {
        const { password, team, phone, nickname } = userInfo;
        let errorMsg = "";
        let isError = false;

        if (password.length < 8 || password.length > 20) {
            errorMsg = "비밀번호는 8자 이상, 20자 이하로 입력해주세요!";
            isError = true;
        } else if (team === "") {
            errorMsg = "소속을 선택해주세요!";
            isError = true;
        } else if (phone === "") {
            errorMsg = "휴대폰 번호를 입력해주세요!";
            isError = true;
        }

        if (isError) {
            Swal.fire({
                icon: "warning",
                title: errorMsg,
            });
        } else {
            axios
                .post("/api/my", null, {
                    params: {
                        PID,
                        password,
                        team,
                        phone,
                        nickname,
                    },
                })
                .then((res) => {
                    if (res.data === "success") {
                        Swal.fire({
                            icon: "success",
                            title: "정보가 변경되었습니다!",
                        }).then(() => {
                            onClick();
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "잠시 후 다시 시도해주세요!",
                        });
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "warning",
                        title: "에러가 발생했습니다!",
                    });
                });
        }
    };

    useEffect(() => {
        axios
            .get("/api/my", {
                params: { PID },
            })
            .then((res) => {
                if (res.data.PID === PID) {
                    setUserInfo(res.data);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: res.data,
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "에러가 발생했습니다!",
                });
            });
    }, [PID]);

    return (
        <Modal>
            <Title>마이 페이지</Title>
            {userInfo && (
                <>
                    <div className={classes.root}>
                        <TextField
                            className={classes.margin}
                            id="standard-read-only-input"
                            label="사번"
                            defaultValue={userInfo.PID}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled
                        />
                        <FormControl className={clsx(classes.margin, classes.textField)} required>
                            <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPW.showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPW.showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={handleChangePW}
                                defaultValue={userInfo.password}
                            />
                        </FormControl>
                        <TextField
                            className={classes.margin}
                            id="standard-read-only-input"
                            label="이름"
                            defaultValue={userInfo.name}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled
                        />
                        <TextField
                            className={classes.margin}
                            id="standard-read-only-input"
                            label="이메일"
                            defaultValue={userInfo.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled
                        />
                        <FormControl className={classes.margin} required>
                            <InputLabel id="demo-simple-select-label">소속</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userInfo.team}
                                onChange={handleChangeTeam}
                            >
                                <MenuItem value={1}>페이북개발팀</MenuItem>
                                <MenuItem value={2}>페이북회원팀</MenuItem>
                                <MenuItem value={3}>페이북결제팀</MenuItem>
                                <MenuItem value={4}>페이북채널팀</MenuItem>
                                <MenuItem value={5}>마이데이터개발팀</MenuItem>
                                <MenuItem value={6}>CB사업팀</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            className={classes.margin}
                            required
                            id="standard-required"
                            label="핸드폰"
                            defaultValue={userInfo.phone}
                            onChange={handleChangePhone}
                        />
                        <TextField
                            className={classes.margin}
                            id="standard"
                            label="닉네임"
                            defaultValue={userInfo.nickname}
                            onChange={handleChangeNickname}
                        />
                    </div>
                    <ButtonContainer>
                        <Button
                            backgroundColor={styles.color.confirm}
                            style={{ width: "100px" }}
                            onClick={handleClickEditButton}
                        >
                            수정하기
                        </Button>
                        <Button
                            backgroundColor={styles.color.cancel}
                            style={{ width: "100px" }}
                            onClick={onClick}
                        >
                            돌아가기
                        </Button>
                    </ButtonContainer>
                </>
            )}
        </Modal>
    );
};

export default My;
