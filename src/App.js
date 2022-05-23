import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import ConferencePage from "./ConferencePage";
import ConferencePapers from "./ConferencePapers";
import ReviewPage from "./ReviewPage";
import ProfilePage from "./ProfilePage";
import CreateConferencePage from "./CreateConferencePage";

function App() {
	return (
		<div className="app">
			<Router>
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/conferencepage/:id" element={<ConferencePage />} />
						<Route path="/conferencePapers" element={<ConferencePapers />} />
						<Route path="/reviewpage" element={<ReviewPage />}></Route>
						<Route path="/profilepage/:id" element={<ProfilePage />}></Route>
						<Route path="/createconferencepage/" element={<CreateConferencePage />}></Route>
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
