import React from "react";
import styled from "@emotion/styled";
import styles from "@style";
import ReactDOM from "react-dom";

const BackgroundDim = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1050;
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    background-color: white;
    box-shadow: "7px 14px 20px rgba(0,0,0,1.2)";
    box-sizing: border-box;
    min-height: 690px;

    @media ${styles.media.sm} {
        width: 300px;
        height: 690px;
        font-size: ${styles.fontStyle.small};
    }

    @media ${styles.media.md} {
        width: 500px;
        height: 690px;
        font-size: ${styles.fontStyle.medium};
    }

    @media ${styles.media.lg} {
        width: 600px;
        height: 700px;
        font-size: ${styles.fontStyle.large};
    }
`;

const Modal = ({ children, ...props }) => {
    const root = document.getElementById("root");

    const modal = (
        <BackgroundDim>
            <ModalContainer>{children}</ModalContainer>
        </BackgroundDim>
    );

    return ReactDOM.createPortal(modal, root);
};

export default Modal;
