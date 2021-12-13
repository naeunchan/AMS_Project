import React from "react";
import styled from "@emotion/styled";
import styles from "@style";
import MuiMenu from "@components/MuiMenu";
import BCLogo from "@style/image/BC_logo.png";
import { useNavigate } from "react-router-dom";

const NavStyled = styled.nav`
	display: flex;
	position: fixed;
	z-index: 1050;
	top: 0;
	left: 0;
	width: 100%;
	border-bottom: 1px solid rgba(80, 80, 80, 0.2);
	box-sizing: border-box;
	background-color: white;
	height: 65px;

	@media ${styles.media.sm} {
		height: 60px;
	}
`;
const image = {
	src: BCLogo,
	alt: "BC Logo",
};

const AMS = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	left: 10px;
	font-weight: bold;
	color: ${styles.color.logo};
	cursor: pointer;
	font-size: 30px;
	img {
		width: 32px;
		height: 32px;
	}
	p {
		font-size: 20px;
	}

	@media ${styles.media.sm} {
		font-size: 26px;

		img {
			width: 28px;
			height: 28px;
		}
	}
`;

const UserDiv = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	height: 100%;
	right: 20px;
`;

const Navbar = ({ user = "", children, ...props }) => {
	const navigate = useNavigate();

	const handleAMSClick = () => {
		navigate("/");
	};

	return (
		<NavStyled style={{ ...props.style }}>
			<AMS onClick={handleAMSClick}>
				<img
					src={image.src}
					alt={image.alt}
					style={{ marginRight: "10px" }}
				/>
				<p>테스트 APK 파일 이력 관리 시스템</p>
			</AMS>
			<UserDiv>
				<MuiMenu />
			</UserDiv>
		</NavStyled>
	);
};

export default Navbar;
