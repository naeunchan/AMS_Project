import React from "react";
import { Button } from "@components";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import styles from "@style";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Swal from "sweetalert2";

const DivStyled = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    justify-content: center;
    border: 1px dashed ${styles.color.confirm};
    border-radius: 8px;
    cursor: pointer;
`;

const PStyled = styled.p`
    font-weight: bold;
    color: ${styles.color.confirm};
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-around;
`;

const FileUpload = ({ fileInfo, onClose, ...props }) => {
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        noKeyboard: true,
        accept: ".apk, .xapk",
        multiple: true,
        noDrag: true,
        maxFiles: 1,
        maxSize: 1000 * 1024 * 1024,
    });

    const handleClickConfirmButton = (event) => {
        event.preventDefault();

        const { version, date } = fileInfo;
        let formData = new FormData();
        let errorMessage = "";
        let isError = false;

        // 유효성 검사
        if (version === "") {
            errorMessage = "버전을 입력해주세요!";
            isError = true;
        } else if (date < new Date().toISOString().slice(0, 10)) {
            errorMessage = "이미 지난 마감일입니다!";
            isError = true;
        } else if (!acceptedFiles.length) {
            errorMessage = "파일을 추가해주세요!";
            isError = true;
        }

        if (isError) {
            Swal.fire({
                icon: "warning",
                title: errorMessage,
            });
        } else {
            formData.append("file", acceptedFiles[0]);

            axios
                .post("/api/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    params: {
                        PID: sessionStorage.getItem("PID"),
                        ...fileInfo,
                    },
                })
                .then((res) => {
                    if (res.data === "success") {
                        Swal.fire({
                            icon: "success",
                            title: "업로드를 완료했습니다!",
                        }).then(() => {
                            sessionStorage.removeItem("coworkers");
                            sessionStorage.removeItem("selected");
                            onClose();
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "에러가 발생했습니다!",
                        });
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "에러가 발생했습니다!",
                    });
                });
        }
    };

    const acceptedFileItems = acceptedFiles
        .map((file, index) => `${index + 1}) ${file.path}\n`)
        .join("");

    return (
        <>
            <TextField
                id="outlined-multiline-static"
                label="첨부파일"
                rows={2}
                multiline
                style={{
                    display: "flex",
                    margin: "10px 0",
                    width: "100%",
                }}
                variant="outlined"
                InputProps={{ readOnly: true, style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "1rem" } }}
                value={
                    acceptedFiles.length
                        ? acceptedFileItems
                        : "파일을 첨부하세요!(파일은 최대 1개, 1GB 크기까지 가능합니다)"
                }
            />
            <DivStyled {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Click</p> <PStyled>&nbsp;HERE&nbsp;</PStyled>
                <p>to upload Only .apk files!</p>
            </DivStyled>

            <ButtonContainer>
                <Button
                    backgroundColor={styles.color.confirm}
                    style={{ width: "100px" }}
                    onClick={handleClickConfirmButton}
                >
                    업로드
                </Button>
                <Button
                    backgroundColor={styles.color.cancel}
                    style={{ width: "100px" }}
                    onClick={onClose}
                >
                    취소
                </Button>
            </ButtonContainer>
        </>
    );
};

export default FileUpload;
