import React, { useState } from "react";
import { Modal, TextArea, Button } from "@components";
import styled from "@emotion/styled";
import styles from "@style";
import axios from "axios";
import Swal from "sweetalert2";

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
    justify-content: space-around;
`;

const AddFile = ({ onClick, onClose, ...props }) => {
    const [fileName, setFileName] = useState();

    const createFile = () => {
        if (fileName === "") {
            Swal.fire({
                icon: "warning",
                title: "애플리케이션명을 입력해주세요!",
            });
        } else {
            axios
                .post("/api/create", null, {
                    params: {
                        fileName,
                        PID: parseInt(JSON.parse(sessionStorage.getItem("PID"))),
                    },
                })
                .then((res) => {
                    if (res.data === "success") {
                        Swal.fire({
                            icon: "success",
                            title: "애플리케이션 폴더를 만들었습니다!",
                        }).then(() => {
                            onClick();
                            onClose();
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "잠시 후 다시 시도해주세요!",
                        });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "에러가 발생했습니다!",
                    }).then(() => {
                        onClose();
                    });
                });
        }
    };
    const handleChangeFileName = (event) => {
        setFileName(event.target.value);
    };

    const handleClickConfirmButton = (event) => {
        event.preventDefault();
        createFile();
    };

    return (
        <Modal width="400px" height="200px" minHeight="100px" style={{ padding: "20px 35px" }}>
            <TextArea
                label="애플리케이션명"
                style={{
                    display: "flex",
                    margin: "10px 0",
                    width: "100%",
                }}
                required
                fontSize="25px"
                fontWeight="bold"
                onChange={handleChangeFileName}
                onKeyUp={(e) => {
                    e.key === "Enter" && createFile();
                }}
            />
            <ButtonContainer>
                <Button
                    backgroundColor={styles.color.confirm}
                    style={{ width: "100px" }}
                    onClick={handleClickConfirmButton}
                >
                    만들기
                </Button>
                <Button
                    backgroundColor={styles.color.cancel}
                    style={{ width: "100px" }}
                    onClick={onClose}
                >
                    취소
                </Button>
            </ButtonContainer>
        </Modal>
    );
};

export default AddFile;
