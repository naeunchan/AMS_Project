import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import styles from "@style";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";

const FileList = styled.div`
	width: 100%;
	height: 80px;
	border: 1px solid rgb(196, 196, 196);
	border-radius: 8px;
	margin-bottom: 10px;
	overflow: auto;
`;

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

const FileUpload = () => {
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		noKeyboard: true,
		accept: ".apk, image/jpeg, image/png, image/jpg",
		multiple: true,
		noDrag: true,
	});

	const acceptedFileItems = acceptedFiles
		.map((file) => `-${file.path}\n`)
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
				InputProps={{ readOnly: true }}
				defaultValue={
					acceptedFileItems ? acceptedFileItems : "파일을 첨부하세요!"
				}
			/>
			<DivStyled {...getRootProps()}>
				<input {...getInputProps()} />
				<p>Click</p> <PStyled>&nbsp;HERE&nbsp;</PStyled>
				<p>to upload Only .apk files! </p>
			</DivStyled>
		</>
	);
};

export default FileUpload;
