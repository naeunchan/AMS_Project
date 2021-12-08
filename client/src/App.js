import axios from "axios";
import React, { useState } from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { LogIn, SignUp, Main, My } from "@pages";

function App() {
	return (
		<Router>
			<main>
				<Routes>
					<Route exact path="/" element={<Main />} />
					<Route path="/login" element={<LogIn />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;
