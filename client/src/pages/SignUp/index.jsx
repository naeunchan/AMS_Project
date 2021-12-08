import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "@components";
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
import axios from "axios";
import Swal from "sweetalert2";

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
	margin-top: 20px;

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

const SignUp = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [values, setValues] = useState({
		PID: "",
		password: "",
		password2: "",
		name: "",
		email: "",
		team: "",
		phone: "",
		nickname: "",
		showPassword: false,
		showPassword2: false,
	});

	const handleChangePID = (event) => {
		setValues({ ...values, PID: parseInt(event.target.value) });
	};

	const handleChangePW = (event) => {
		setValues({ ...values, password: event.target.value });
	};

	const handleChangePW2 = (event) => {
		setValues({ ...values, password2: event.target.value });
	};

	const handleChangeName = (event) => {
		setValues({ ...values, name: event.target.value });
	};

	const handleChangeEmail = (event) => {
		setValues({ ...values, email: event.target.value });
	};

	const handleChangeTeam = (event) => {
		event.preventDefault();
		setValues({ ...values, team: event.target.value });
	};

	const handleChangePhone = (event) => {
		setValues({ ...values, phone: event.target.value });
	};

	const handleChangeNickname = (event) => {
		setValues({ ...values, nickname: event.target.value });
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

	const handleClickConfirmButton = () => {
		const { PID, password, password2, name, email, team, phone, nickname } =
			values;
		let errorMsg = "";
		let isError = false;

		if (PID === "") {
			errorMsg = "사번을 입력해주세요!";
			isError = true;
		} else if (password.length < 8 || password.length > 20) {
			errorMsg = "비밀번호는 8자 이상, 20자 이하로 입력해주세요!";
			isError = true;
		} else if (password2 === "") {
			errorMsg = "비밀번호 확인이 필요합니다!";
			isError = true;
		} else if (name === "") {
			errorMsg = "이름을 입력해주세요!";
			isError = true;
		} else if (email === "") {
			errorMsg = "이메일을 입력해주세요!";
			isError = true;
		} else if (team === "") {
			errorMsg = "소속을 선택해주세요!";
			isError = true;
		} else if (phone === "") {
			errorMsg = "휴대폰 번호를 입력해주세요!";
			isError = true;
		} else if (password !== password2) {
			errorMsg = "비밀번호가 일치하지 않습니다!";
			isError = true;
		}

		if (isError) {
			Swal.fire({
				icon: "warning",
				title: errorMsg,
			});
		} else {
			axios
				.post("/api/signup", null, {
					params: {
						PID,
						password,
						name,
						email,
						team,
						phone,
						nickname,
					},
				})
				.then((res) => {
					if (res.data === "success") {
						Swal.fire({
							icon: "success",
							title: "회원가입 성공!",
						});
					} else if (res.data === "duplicated") {
						Swal.fire({
							icon: "error",
							title: "이미 가입된 사번입니다!",
						});
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
		}
	};

	const handleClickBackButton = () => {
		navigate("/login");
	};

	return (
		<Modal>
			<Title>회원가입</Title>
			<div className={classes.root}>
				<TextField
					className={classes.margin}
					required
					id="standard-required"
					label="사번"
					defaultValue=""
					onChange={handleChangePID}
				/>
				<FormControl
					className={clsx(classes.margin, classes.textField)}
					required>
					<InputLabel htmlFor="standard-adornment-password">
						비밀번호
					</InputLabel>
					<Input
						id="standard-adornment-password"
						type={values.showPassword ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}>
									{values.showPassword ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							</InputAdornment>
						}
						onChange={handleChangePW}
					/>
				</FormControl>
				<FormControl
					className={clsx(classes.margin, classes.textField)}
					required>
					<InputLabel htmlFor="standard-adornment-password">
						비밀번호 확인
					</InputLabel>
					<Input
						id="standard-adornment-password"
						type={values.showPassword2 ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword2}
									onMouseDown={handleMouseDownPassword}>
									{values.showPassword ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							</InputAdornment>
						}
						onChange={handleChangePW2}
					/>
				</FormControl>
				<TextField
					className={classes.margin}
					required
					id="standard-required"
					label="이름"
					defaultValue=""
					onChange={handleChangeName}
				/>
				<TextField
					className={classes.margin}
					required
					id="standard-required"
					label="이메일"
					defaultValue=""
					onChange={handleChangeEmail}
				/>
				<FormControl className={classes.margin} required>
					<InputLabel id="demo-simple-select-label">소속</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={values.team}
						onChange={handleChangeTeam}>
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
					defaultValue=""
					onChange={handleChangePhone}
				/>
				<TextField
					className={classes.margin}
					id="standard"
					label="닉네임"
					defaultValue=""
					onChange={handleChangeNickname}
				/>
			</div>
			<ButtonContainer>
				<Button
					backgroundColor={styles.color.confirm}
					style={{ width: "100px" }}
					onClick={handleClickConfirmButton}>
					회원가입
				</Button>
				<Button
					backgroundColor={styles.color.cancel}
					style={{ width: "100px" }}
					onClick={handleClickBackButton}>
					돌아가기
				</Button>
			</ButtonContainer>
		</Modal>
	);
};

export default SignUp;
