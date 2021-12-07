import React from "react";
import styled from "@emotion/styled";
import styles from "@style";
import MuiMenu from "@components/MuiMenu";
import BCLogo from "@style/image/BC_logo.png";

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

	@media ${styles.media.sm} {
		height: 60px;
	}

	@media ${styles.media.md} {
		height: 63px;
	}

	@media ${styles.media.lg} {
		height: 65px;
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

	@media ${styles.media.sm} {
		font-size: 26px;

		img {
			width: 28px;
			height: 28px;
		}
	}

	@media ${styles.media.md} {
		font-size: 28px;

		img {
			width: 30px;
			height: 30px;
		}
	}

	@media ${styles.media.lg} {
		font-size: 30px;

		img {
			width: 32px;
			height: 32px;
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

const Navbar = ({
	user = "",
	children,
	onClickEditButton,
	onClickLogoutButton,
	...props
}) => {
	const handleClick = () => {
		console.log("Go Home");
	};

	return (
		<NavStyled style={{ ...props.style }}>
			<AMS onClick={handleClick}>
				<img
					src={image.src}
					alt={image.alt}
					style={{ marginRight: "10px" }}
				/>
				AMS
			</AMS>
			<UserDiv>
				<MuiMenu />
			</UserDiv>
		</NavStyled>
	);
};

export default Navbar;
