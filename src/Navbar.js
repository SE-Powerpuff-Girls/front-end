import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const token = localStorage.getItem("token");
		return !(token === undefined || token === null);
	});
	const navigate = useNavigate();
	const handleLogOut = (e) => {
		e.preventDefault();
		localStorage.clear();
		navigate("/login");
	};

	const handleCreateConference = (e) => {
		e.preventDefault();
		if (isLoggedIn) {
			navigate("/createconferencepage");
		} else {
			navigate("/login");
		}
	};
	return (
		<div className={styles["navbar"]}>
			<h1>Powerpuff girls</h1>
			<form className={styles["form"]}>
				<input type="search" className={styles["search-field"]}></input>
				<button type="submit" className={styles["search-button"]}>
					<img className={styles["search-icon"]} src="/Img/searchIcon.webp" alt="search Icon"></img>
				</button>
			</form>
			<nav>
				<button onClick={handleCreateConference} className={styles["create-conference"]}>
					Create conference
				</button>
				{!isLoggedIn && (
					<Link to="/login" className={styles["login-button"]}>
						Login
					</Link>
				)}
				{isLoggedIn && (
					<Link to={`/profilePage/${JSON.parse(localStorage.getItem("user")).userid}`} className={styles["login-button"]}>
						{JSON.parse(localStorage.getItem("user")).firstname}
					</Link>
				)}
				{isLoggedIn && (
					<button className={styles["logout-button"]} onClick={handleLogOut}>
						Logout
					</button>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
