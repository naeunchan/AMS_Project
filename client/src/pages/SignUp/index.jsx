import React from "react";
import { Input, Button } from "@components";
import styled from "@emotion/styled";
import styles from "@style";

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

const SignUp = () => {
	return (
		<BackgroundDim>
			<ModalContainer>
				<Title>회원가입</Title>
			</ModalContainer>
		</BackgroundDim>
	);
};

export default SignUp;
