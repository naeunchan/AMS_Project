import React from "react";
import styled from "@emotion/styled";
import styles from "@style";
import MuiMenu from "@components/MuiMenu";

const NavStyled = styled.nav`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid rgba(80, 80, 80, 0.2);
    box-sizing: border-box;

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

const AMS = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    left: 10px;
    font-weight: bold;
    color: black;
    cursor: pointer;

    @media ${styles.media.sm} {
        font-size: 26px;
    }

    @media ${styles.media.md} {
        font-size: 28px;
    }

    @media ${styles.media.lg} {
        font-size: 30px;
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
    const handleClick = () => {
        console.log("Go Home");
    };

    return (
        <NavStyled style={{ ...props.style }}>
            <AMS onClick={handleClick}>AMS</AMS>
            <UserDiv>
                <MuiMenu />
            </UserDiv>
        </NavStyled>
    );
};

export default Navbar;
