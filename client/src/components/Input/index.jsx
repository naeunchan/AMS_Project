import React from "react";
import styled from "@emotion/styled";

const InputContainer = styled.div`
    display: flex;
`;

const InputStyled = styled.input`
    min-width: 200px;
    width: ${({ width }) => (width ? width : "300px")};
    height: ${({ height }) => (height ? height : "30px")};
    border: 1px solid gray;
    border-radius: 8px;
    padding: 0;
    box-sizing: border-box;
`;

const Input = ({
    children,
    width,
    height,
    type = "text",
    placeholder,
    onChange,
    onKeyUp,
    ...props
}) => {
    return (
        <InputContainer>
            <InputStyled
                style={{ ...props.style }}
                width={width}
                height={height}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                onKeyUp={onKeyUp}
            />
        </InputContainer>
    );
};

export default Input;
