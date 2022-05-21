import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles["footer"]}>
			<p>Copyright</p>
			<div className={styles["information"]}>
				<a href="">Contact</a>
				<a href="">About us</a>
			</div>
		</footer>
	);
};

export default Footer;
