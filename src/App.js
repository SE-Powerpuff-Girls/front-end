import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import ConferencePage from "./ConferencePage";
import ConferencePapers from "./ConferencePapers";
import ReviewPage from "./ReviewPage";

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
						<Route path="/conferencePapers" element={<ConferencePapers />} />
						<Route path="/reviewpage" element={<ReviewPage />}></Route>
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
