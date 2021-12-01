import React from "react";
import styled from "@emotion/styled";

const InputContainer = styled.div`
    display: flex;
`;

const InputStyled = styled.input`
    width: 300px;
    height: 30px;
    border: 1px solid gray;
    border-radius: 8px;
    padding-left: 10px;
    box-sizing: border-box;
`;

const Input = ({ children, password, ...props }) => {
    return (
        <InputContainer style={{ ...props.style }}>
            <InputStyled
                placeholder={password ? "password" : "e-mail"}
                type={password ? "password" : "email"}
            ></InputStyled>
        </InputContainer>
    );
};

export default Input;
