import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import Navbar from "./Navbar";
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className={styles["login-page"]}>
			<Navbar />
			<div className={styles["login-container"]}>
				<h2>Login</h2>
				<form>
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
				<Link to="/register" className={styles["no-account"]}>
					I don't have an account
				</Link>
			</div>
		</div>
	);
};

export default Login;
