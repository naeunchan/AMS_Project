import React from "react";
import styled from "@emotion/styled";
import styles from "@style";
import BCLogo from "@style/image/BC_logo.png";

const image = {
	src: BCLogo,
	alt: "BC Logo",
};

const DivStyled = styled.div`
	display: flex;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 40px;
`;

const Text = styled.div`
	font-size: 35px;
	font-weight: bold;
`;

const NotFound = () => {
	return (
		<DivStyled>
			<ImageContainer>
				<img
					src={image.src}
					alt={image.alt}
					width="80px"
					height="80px"
				/>
			</ImageContainer>
			<Text>페이지를 찾을 수 없습니다!</Text>
		</DivStyled>
	);
};

export default NotFound;
