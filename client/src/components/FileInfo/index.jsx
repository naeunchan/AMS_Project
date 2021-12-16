import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import styles from "@style";
import Divider from "@material-ui/core/Divider";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 65px;
	width: 100%;

	@media ${styles.media.sm} {
		position: fixed;
		left: 0;
		top: 65px;
		width: 100vw;
		margin-top: 60px;
	}
`;

const TitleContainer = styled.div`
	margin-top: 15px;
	min-width: 300px;
	width: 80%;
	height: 60px;
	display: flex;
	justify-content: center;

	@media ${styles.media.sm} {
		margin-top: 5px;
	}
`;

const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	border: 3px solid rgb(80, 80, 80);
	box-shadow: "7px 14px 20px rgba(0,0,0,1.2)";
	border-radius: 8px;
	font-size: 20px;
`;

const BodyContainer = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	margin-top: 15px;
`;

const Body = styled.div`
	width: 100%;
	height: 300px;
	display: flex;
	flex-direction: column;
	margin-top: 15px;
`;

const FildInfo = ({ fileName, ...props }) => {
	const data = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 8, 9, 3,
		4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 8, 9,
	];

	return (
		<Container>
			<TitleContainer>
				<Title>{fileName}</Title>
			</TitleContainer>
			<BodyContainer>
				{data.map((v, index) => (
					<>
						<Body key={index}>v</Body>
						<Divider />
					</>
				))}
			</BodyContainer>
		</Container>
	);
};

export default FildInfo;
