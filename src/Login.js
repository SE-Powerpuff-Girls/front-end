import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Navbar from "./Navbar";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [failedLogin, setFailedLogin] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/");
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setFailedLogin(false);
		const user = { email, password };
		fetch(process.env.REACT_APP_API_LINK + "users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		}).then((response) => {
			if (response.status === 201) {
				setFailedLogin(false);
				response
					.json()
					.then((data) => {
						localStorage.setItem("token", data.token);
						localStorage.setItem("user", JSON.stringify(data.output));
					})
					.then(() => navigate(`/profilePage/${JSON.parse(localStorage.getItem("user")).userid}`));
			} else {
				response
					.json()
					.then(() => {
						setFailedLogin(true);
						setEmail("");
						setPassword("");
					})
					.then(() => navigate("/login"));
			}
		});
	};

	return (
		<div className={styles["login-page"]}>
			<Navbar />
			<div className={styles["login-container"]}>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<label>Email</label>
					<input onChange={(e) => setEmail(e.target.value)} type="email" value={email} required placeholder=" Enter your email..."></input>
					<label>Password</label>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						value={password}
						required
						placeholder=" Enter your password..."
					></input>
					<Link to="/" className={styles["lost-password"]}>
						Lost my password
					</Link>
					<button type="submit">Login</button>
				</form>
				{failedLogin && <span className={styles["failed-login"]}>Incorrect user or password, please try again!</span>}
				<Link to="/register" className={styles["no-account"]}>
					I don't have an account
				</Link>
			</div>
		</div>
	);
};

export default Login;
