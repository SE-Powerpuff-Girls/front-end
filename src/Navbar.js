import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
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
				<Link to="/" className={styles["create-conference"]}>
					Create conference
				</Link>
				<Link to="/login" className={styles["login-button"]}>
					Login
				</Link>
			</nav>
		</div>
	);
};

export default Navbar;
