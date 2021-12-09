import React from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { LogIn, Main, NotFound } from "@pages";

function App() {
	return (
		<Router>
			<main>
				<Routes>
					<Route exact path="/" element={<Main />} />
					<Route path="/login" element={<LogIn />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
