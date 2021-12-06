import React, { useState, useRef } from "react";
import { Button } from "@components";
import styled from "@emotion/styled";
import styles from "@style";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const BackgroundDim = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    background-color: white;
    box-shadow: "7px 14px 20px rgba(0,0,0,1.2)";
    box-sizing: border-box;
    height: 90vh;

    @media ${styles.media.sm} {
        width: 300px;
        height: 690px;
        font-size: ${styles.fontStyle.small};
    }

    @media ${styles.media.md} {
        width: 700px;
        font-size: ${styles.fontStyle.medium};
    }

    @media ${styles.media.lg} {
        width: 800px;
        font-size: ${styles.fontStyle.large};
    }
`;

const Title = styled.div`
    display: flex;
    font-size: 35px;
    font-weight: bold;
    margin: 20px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin-top: 20px;

    @media ${styles.media.sm} {
        width: 100%;
        flex-direction: column;
        align-items: center;
        font-size: ${styles.fontStyle.small};

        Button:nth-of-type(1) {
            margin-bottom: 20px;
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

const SignUp = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: "",
        password: "",
        password2: "",
        name: "",
        pid: "",
        team: "",
        phone: "",
        showPassword: false,
        showPassword2: false,
    });
    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();
    const nameRef = useRef();
    const pidRef = useRef();
    const teamRef = useRef();
    const phoneRef = useRef();

    const handleChangeTeam = (event) => {
        event.preventDefault();
        setValues({ ...values, team: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowPassword2 = () => {
        setValues({ ...values, showPassword2: !values.showPassword2 });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleConfirmButtonClicked = (event) => {
        console.log(values);
        console.log("회원가입!");
    };

    const handleBackButtonClicked = (event) => {
        console.log("돌아가기");
    };

    return (
        <BackgroundDim>
            <ModalContainer>
                <Title>회원가입</Title>
                <div className={classes.root}>
                    <TextField
                        ref={emailRef}
                        className={classes.margin}
                        required
                        id="standard-required"
                        label="이메일"
                        defaultValue=""
                    />
                    <FormControl className={clsx(classes.margin, classes.textField)} required>
                        <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
                        <Input
                            ref={passwordRef}
                            id="standard-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} required>
                        <InputLabel htmlFor="standard-adornment-password">비밀번호 확인</InputLabel>
                        <Input
                            ref={password2Ref}
                            id="standard-adornment-password"
                            type={values.showPassword2 ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword2}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <TextField
                        ref={nameRef}
                        className={classes.margin}
                        required
                        id="standard-required"
                        label="이름"
                        defaultValue=""
                    />
                    <TextField
                        ref={pidRef}
                        className={classes.margin}
                        required
                        id="standard-required"
                        label="사번"
                        defaultValue=""
                    />
                    <FormControl className={classes.margin} required>
                        <InputLabel id="demo-simple-select-label">소속</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            ref={teamRef}
                            value={values.team}
                            onChange={handleChangeTeam}
                        >
                            <MenuItem value={1}>페이북개발팀1</MenuItem>
                            <MenuItem value={2}>페이북개발팀2</MenuItem>
                            <MenuItem value={3}>페이북개발팀3</MenuItem>
                            <MenuItem value={4}>페이북개발팀4</MenuItem>
                            <MenuItem value={5}>페이북개발팀5</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        ref={phoneRef}
                        className={classes.margin}
                        required
                        id="standard-required"
                        label="핸드폰"
                        defaultValue=""
                    />
                </div>
                <ButtonContainer>
                    <Button
                        backgroundColor={styles.color.confirm}
                        style={{ width: "100px" }}
                        onClick={handleConfirmButtonClicked}
                    >
                        회원가입
                    </Button>
                    <Button
                        backgroundColor={styles.color.cancel}
                        style={{ width: "100px" }}
                        onClick={handleBackButtonClicked}
                    >
                        돌아가기
                    </Button>
                </ButtonContainer>
            </ModalContainer>
        </BackgroundDim>
    );
};

export default SignUp;
