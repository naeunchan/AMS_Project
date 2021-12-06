import React from "react";
import { Navbar, Sidebar } from "@components";
import styled from "@emotion/styled";

const Wrapper = styled.div`
	display: flex;
`;

const Main = () => {
	return (
		<Wrapper>
			<Navbar />
			<Sidebar />
		</Wrapper>
	);
};

export default Main;
