import axios from "axios";
import React, { useState } from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { LogIn } from "@pages";

function App() {
	return (
		<Router>
			<main>
				<Routes>
					<Route exact path="/" element={<LogIn />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
