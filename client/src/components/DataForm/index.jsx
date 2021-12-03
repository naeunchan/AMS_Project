import React from "react";
import { Input, Button } from "@components";
import styled from "@emotion/styled";

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
	top: 50%;
	left: 50%;
	width: 50vw;
	height: 90vh;
	transform: translate(-50%, -50%);
	border-radius: 16px;
	background-color: white;
	box-shadow: "7px 14px 20px rgba(0, 0, 0, 1.2)";
	box-sizing: border-box;
`;

const DataForm = () => {
	return (
		<BackgroundDim>
			<ModalContainer>
				<Input placeholder="제목" width="80vw" height="10vh" />
			</ModalContainer>
		</BackgroundDim>
	);
};

export default DataForm;
