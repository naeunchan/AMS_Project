import React from "react";
import { Button } from "@components";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import styles from "@style";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

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

const FileUpload = ({ onClose, ...props }) => {
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        noKeyboard: true,
        accept: ".apk, .xapk",
        multiple: true,
        noDrag: true,
    });

    const handleClickConfirmButton = (event) => {
        event.preventDefault();

        let formData = new FormData();

        acceptedFiles.forEach((file) => {
            formData.append("files", file);
        });

        axios
            .post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
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
                value={acceptedFiles.length ? acceptedFileItems : "파일을 첨부하세요!"}
            />
            <DivStyled {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Click</p> <PStyled>&nbsp;HERE&nbsp;</PStyled>
                <p>to upload Only .apk files! </p>
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
