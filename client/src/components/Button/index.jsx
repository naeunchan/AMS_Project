import React from "react";
import styled from "@emotion/styled";
import styles from "../../style";

const ButtonStyled = styled.button`
    cursor: pointer;
    border-radius: 4px;
    border: none;
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : "white")};
    font-weight: bold;
    color: ${({ color }) => (color ? color : "white")};

    @media ${styles.media.sm} {
        width: 60px;
        height: 30px;
        font-size: ${styles.fontStyle.small};
    }
    @media ${styles.media.md} {
        width: 65px;
        height: 32px;
        font-size: ${styles.fontStyle.medium};
    }
    @media ${styles.media.lg} {
        width: 70px;
        height: 34px;
        font-size: ${styles.fontStyle.large};
    }
`;

const Button = ({ children, backgroundColor = "", color = "", onClick, ...props }) => {
    return (
        <ButtonStyled style={{ backgroundColor, color, ...props.style }} onClick={onClick}>
            {children}
        </ButtonStyled>
    );
};

export default Button;
