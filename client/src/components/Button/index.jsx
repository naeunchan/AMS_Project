import React from "react";
import styled from "@emotion/styled";
import styles from "../../style";

const ButtonStyled = styled.button`
	cursor: pointer;
	border-radius: 4px;
	border: none;
	background-color: ${({ backgroundColor }) =>
		backgroundColor ? backgroundColor : "white"};
	font-weight: bold;
	color: ${({ color }) => (color ? color : "white")};
	height: 34px;
	font-size: ${styles.fontStyle.large};

	@media ${styles.media.sm} {
		height: 30px;
		font-size: ${styles.fontStyle.small};
	}
`;

const Button = ({
	children,
	backgroundColor = "",
	color = "",
	onClick,
	...props
}) => {
	return (
		<ButtonStyled
			style={{ backgroundColor, color, ...props.style }}
			onClick={onClick}>
			{children}
		</ButtonStyled>
	);
};

export default Button;
