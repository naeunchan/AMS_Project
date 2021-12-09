import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "@components";
import styled from "@emotion/styled";
import Swal from "sweetalert2";

const Wrapper = styled.div`
	display: flex;
`;

const Main = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!sessionStorage.getItem("PID")) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<Wrapper>
			<Navbar />
			<Sidebar />
		</Wrapper>
	);
};

export default Main;
