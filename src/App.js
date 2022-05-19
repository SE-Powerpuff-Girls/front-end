import "./App.css";
import "./Home.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import ConferencePage from "./ConferencePage";

function App() {
	return (
		<div className="app">
			<Router>
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/conferencePage" element={<ConferencePage />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
