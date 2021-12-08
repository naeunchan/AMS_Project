import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@components";
import styled from "@emotion/styled";
import BCLogo from "@style/image/BC_logo.png";
import styles from "@style";
import axios from "axios";
import Swal from "sweetalert2";

const image = {
	src: BCLogo,
	alt: "BC Logo",
};

const FormBox = styled.div`
	display: flex;
	position: fixed;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px 0 20px 0;
`;

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const LogIn = () => {
	const navigate = useNavigate();
	const [PID, setPID] = useState("");
	const [password, setPassword] = useState("");

	const handleChangePID = (event) => {
		setPID(parseInt(event.target.value));
	};

	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	};

	const handleClickLogInButton = () => {
		axios
			.post("/api/login", null, {
				params: {
					PID,
					password,
				},
			})
			.then((res) => {
				if (res.data.PID === PID && res.data.password === password) {
					sessionStorage.setItem("PID", PID);
					navigate("/");
				} else {
					Swal.fire({
						icon: "error",
						title: res.data,
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleClickSignUpButton = () => {
		navigate("/signup");
	};

	return (
		<FormBox>
			<Container>
				<ImageContainer>
					<img
						src={image.src}
						alt={image.alt}
						width="80px"
						height="80px"
					/>
				</ImageContainer>
				<InputContainer>
					<Input
						type="text"
						placeholder="사번"
						style={{
							marginBottom: "20px",
							paddingLeft: "10px",
						}}
						onChange={handleChangePID}
					/>
					<Input
						type="password"
						placeholder="password"
						password
						style={{ paddingLeft: "10px" }}
						onChange={handleChangePassword}
					/>
				</InputContainer>
				<ButtonContainer>
					<Button
						backgroundColor={styles.color.confirm}
						style={{ width: "100%", marginBottom: "10px" }}
						onClick={handleClickLogInButton}>
						로그인
					</Button>
					<Button
						backgroundColor={styles.color.logo}
						color="white"
						onClick={handleClickSignUpButton}>
						가입하기
					</Button>
				</ButtonContainer>
			</Container>
		</FormBox>
	);
};

export default LogIn;