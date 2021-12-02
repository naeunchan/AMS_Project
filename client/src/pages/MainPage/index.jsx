import React from "react";
import { Navbar, Sidebar } from "@components";
import styled from "@emotion/styled";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const MainPage = () => {
	return (
		<Wrapper>
			<Navbar />
			<div>
				<Sidebar />
			</div>
		</Wrapper>
	);
};

export default MainPage;
