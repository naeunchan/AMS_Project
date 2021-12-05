import React from "react";
import { Input, Button, DatePickers, TextArea, FileUpload } from "@components";
import styled from "@emotion/styled";
import styles from "@style";

const BackgroundDim = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    background-color: white;
    box-shadow: "7px 14px 20px rgba(0, 0, 0, 1.2)";
    box-sizing: border-box;
    height: 90vh;

    @media ${styles.media.sm} {
        width: 300px;
        height: 690px;
        font-size: ${styles.fontStyle.small};
    }

    @media ${styles.media.md} {
        width: 700px;
        font-size: ${styles.fontStyle.medium};
    }

    @media ${styles.media.lg} {
        width: 800px;
        font-size: ${styles.fontStyle.large};
    }
`;

const FlexContainer = styled.div`
    display: flex;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

const DataForm = () => {
    const handleConfirmClickButton = () => {
        console.log("confirm!");
    };

    const handleCancelClickButton = () => {
        console.log("cancel!");
    };

    return (
        <BackgroundDim>
            <ModalContainer>
                <TextArea
                    label="파일명"
                    style={{
                        display: "flex",
                        margin: "20px 30px 10px 30px",
                    }}
                    required
                    fontSize="25px"
                    fontWeight="bold"
                />
                <FlexContainer>
                    <TextArea
                        label="버전"
                        style={{
                            display: "flex",
                            margin: "10px 10px 10px 30px",
                        }}
                        required
                    />
                    <DatePickers label="마감일" style={{ margin: "10px 30px 10px 10px" }} />
                </FlexContainer>
                <TextArea
                    label="상세정보"
                    minRows="10"
                    multiline
                    style={{
                        display: "flex",
                        margin: "10px 30px 10px 30px",
                    }}
                />
                <FileUpload
                    style={{
                        margin: "10px 30px 10px 30px",
                    }}
                />
                <ButtonContainer>
                    <Button
                        backgroundColor={styles.color.confirm}
                        style={{ width: "100px" }}
                        onClick={handleConfirmClickButton}
                    >
                        업로드
                    </Button>
                    <Button
                        backgroundColor={styles.color.cancel}
                        style={{ width: "100px" }}
                        onClick={handleCancelClickButton}
                    >
                        취소
                    </Button>
                </ButtonContainer>
            </ModalContainer>
        </BackgroundDim>
    );
};

export default DataForm;
