import React from "react";
import styled from "@emotion/styled";

const InputContainer = styled.div`
	display: flex;
`;

const InputStyled = styled.input`
	width: ${({ width }) => (width ? width : "300px")};
	height: ${({ height }) => (height ? height : "30px")};
	border: 1px solid gray;
	border-radius: 8px;
	padding-left: 10px;
	box-sizing: border-box;
`;

const Input = ({
	children,
	width,
	height,
	type = "text",
	placeholder,
	...props
}) => {
	return (
		<InputContainer style={{ ...props.style }}>
			<InputStyled
				width={width}
				height={height}
				placeholder={placeholder}
				type={type}></InputStyled>
		</InputContainer>
	);
};

export default Input;
