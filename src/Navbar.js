import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<div className="navbar">
			<h1>Powerpuff girls</h1>
			<form className="form">
				<input type="search" className="search-field"></input>
				<button type="submit" className="search-button">
					<img className="search-icon" src="/Img/searchIcon.webp" alt="search Icon"></img>
				</button>
			</form>
			<nav>
				<Link to="/" className="create-conference">
					Create conference
				</Link>
				<Link to="/login" className="login-button">
					Login
				</Link>
			</nav>
		</div>
	);
};

export default Navbar;
