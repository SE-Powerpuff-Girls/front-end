import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import Navbar from "./Navbar";

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			console.log(localStorage);
			navigate("/");
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = { email, firstName, lastName, password, confirmPassword };
		fetch(process.env.REACT_APP_API_LINK + "users/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		}).then(() => {
			navigate("/login");
		});
	};

	return (
		<div className={styles["register-page"]}>
			<Navbar />
			<div className={styles["register-container"]}>
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					<label>Email</label>
					<input onChange={(e) => setEmail(e.target.value)} type="email" placeholder=" Email" required value={email}></input>

					<label>First name</label>
					<input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder=" First name" required value={firstName}></input>

					<label>Last name</label>
					<input onChange={(e) => setLastName(e.target.value)} type="text" placeholder=" Last name" required value={lastName}></input>

					<label>Password</label>
					<input onChange={(e) => setPassword(e.target.value)} type="password" placeholder=" Password" required value={password}></input>

					<label>Confirm password</label>
					<input
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						placeholder=" Confirm password"
						required
						value={confirmPassword}
					></input>
					<div className={styles["checkbox-terms"]}>
						<input type="checkbox" required></input>
						<span>
							I hereby agree to <Link to="/">terms and conditions</Link>
						</span>
					</div>
					<button type="submit" value="Submit">
						Register
					</button>
				</form>
				<Link to="/login" className={styles["has-account"]}>
					I already have an account
				</Link>
			</div>
		</div>
	);
};

export default Register;
