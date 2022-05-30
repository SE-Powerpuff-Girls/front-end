import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import ConferencePage from "./ConferencePage";
import ConferencePapers from "./ConferencePapers";
import ViewPaper from "./ViewPaper";
import ProfilePage from "./ProfilePage";
import CreateConferencePage from "./CreateConferencePage";
import ReviewPaperVersion from "./ReviewPaperVersion";
import AddPaperVersionPage from "./AddPaperVersionPage";

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
						<Route path="/conferencepapers" element={<ConferencePapers />} />
						<Route path="/reviewpaperversion" element={<ReviewPaperVersion />}></Route>
						<Route path="/profilepage/:id" element={<ProfilePage />}></Route>
						<Route path="/createconferencepage/" element={<CreateConferencePage />}></Route>
						<Route path="/viewpaper" element={<ViewPaper />}></Route>
						<Route path="/addpaperversion" element={<AddPaperVersionPage />}></Route>
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;
