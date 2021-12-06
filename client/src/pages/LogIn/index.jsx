import React, { useState, useEffect } from "react";
import { Button, Input } from "@components";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import styled from "@emotion/styled";
import BCLogo from "@style/image/BC_logo.png";
import styles from "@style";

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

const LogIn = ({ setToken }) => {
	const [initLoading, setInitLoading] = useState(false);
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	// const handleLogin = async (e) => {
	//     e.preventDefault();

	//     const token = await loginApi({
	//         email,
	//         password,
	//     });

	//     setToken(token);
	// };
	// const { isLoading, errors, handleChange, handleSubmit } = useForm({
	// 	initValues: {
	// 		email: "",
	// 		password: "",
	// 	},
	// 	onSubmit: async ({ email, password }) => {
	// 		try {
	// 			const response = await authApi.login({ email, password });

	// 			sessionStorage.setItem(
	// 				"AMS_PID",
	// 				JSON.stringify(response.data.PID),
	// 			);

	// 			Swal.fire({
	// 				text: "",
	// 			});
	// 		} catch (error) {
	// 			Swal.fire({
	// 				text: "이메일과 비밀번호를 확인해주세요!",
	// 				confirmButtonColor: "#F44336",
	// 			});
	// 		}
	// 	},
	// 	validate: ({ email, password }) => {
	// 		const errors = {};

	// 		if (!validateEmailFormat(email)) {
	// 			errors.email = "이메일 형식이 아닙니다!";
	// 		}

	// 		if (!validateEmailEmpty(email)) {
	// 			errors.email = "이메일을 입력해주세요!";
	// 		}

	// 		if (!validatePasswordLength(password)) {
	// 			errors.password = "비밀번호를 8자 이상 입력해주세요!";
	// 		}

	// 		if (!validatePasswordEmpty(password)) {
	// 			errors.password = "비밀번호를 입력해주세요!";
	// 		}

	// 		return errors;
	// 	},
	// });

	return (
		<FormBox>
			<form method="post">
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
							type="email"
							placeholder="e-mail"
							style={{
								marginBottom: "20px",
								paddingLeft: "10px",
							}}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							type="password"
							placeholder="password"
							password
							style={{ paddingLeft: "10px" }}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</InputContainer>
					<ButtonContainer>
						<Button
							backgroundColor={styles.color.confirm}
							style={{ width: "100%", marginBottom: "10px" }}
							// onClick={handleLogin}
						>
							로그인
						</Button>
						<Button
							backgroundColor={styles.color.logo}
							color="white">
							가입하기
						</Button>
					</ButtonContainer>
				</Container>
			</form>
		</FormBox>
	);
};

// LogIn.propTypes = {
// 	setToken: PropTypes.func.isRequired,
// };

export default LogIn;
