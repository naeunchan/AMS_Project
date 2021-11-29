import React from "react";
import styled from "@emotion/styled";

const InputContainer = styled.div`
	display: flex;
`;

const InputStyled = styled.input`
	width: 300px;
	height: 20px;
	border-radius: 10px;
	padding-left: 10px;
`;

const Input = ({ children, password, ...props }) => {
	return (
		<InputContainer style={{ ...props }}>
			<InputStyled
				placeholder={password ? "password" : "e-mail"}
				type={password ? "password" : "email"}></InputStyled>
		</InputContainer>
	);
};

export default Input;
