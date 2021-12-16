import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Sidebar, FileInfo } from "@components";
import styled from "@emotion/styled";
import Swal from "sweetalert2";

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;

const Main = () => {
	const navigate = useNavigate();
	const [fileName, setFileName] = useState();

	useEffect(() => {
		if (!sessionStorage.getItem("PID")) {
			navigate("/login");
		}
	}, [navigate]);

	const handleChangeFileName = () => {
		const { fileName } = JSON.parse(sessionStorage.getItem("selected"));

		setFileName(fileName);
	};

	return (
		<Wrapper>
			<Navbar />
			<Sidebar onChange={handleChangeFileName} />
			{fileName && <FileInfo fileName={fileName} />}
		</Wrapper>
	);
};

export default Main;
