import axios from "axios";
import React, { useState } from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { LoginPage } from "@pages";

function App() {
	const [token, setToken] = useState();

	if (!token) {
		return <LoginPage setToken={setToken} />;
	}

	return (
		<Router>
			<main>
				<Routes>
					<Route exact path="/" element={<LoginPage />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
