import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<nav className="nav-bar">
			<h1>Conference manager</h1>
			<div className="links">
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
		</nav>
	);
};

export default Navbar;
