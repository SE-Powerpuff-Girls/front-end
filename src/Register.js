import { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import Navbar from "./Navbar";

const Register = () => {
	const [user, setUser] = useState({ email: "", password: "", firstName: "", lastName: "", confirmPassword: "" });

	const navigate = useNavigate();

	const [error, setError] = useState(false);

	// useEffect(() => {
	// 	if (localStorage.getItem("token")) {
	// 		console.log(localStorage);
	// 		navigate("/");
	// 	}
	// }, []);

	const handleSubmit = async (e) => {
		await e.preventDefault();
		fetch(process.env.REACT_APP_API_LINK + "users/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		})
			.then((response) => {
				if (response.status === 201) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				const { token, newUser } = data;
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(newUser));
			})
			// .then(() => {
			// 	navigate("/");
			// })
			.catch((error) => {
				console.error("Error sending data: ", error);
				setError(error);
			});
		navigate(`/profilepage/:${JSON.parse(localStorage.getItem("user")).userid}`);
	};

	if (error) {
		return "Error...";
	}

	return (
		<div className={styles["register-page"]}>
			<Navbar />
			<div className={styles["register-container"]}>
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					<label>Email</label>
					<input onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder=" Email" required value={user.email}></input>

					<label>First name</label>
					<input
						onChange={(e) => setUser({ ...user, firstName: e.target.value })}
						type="text"
						placeholder=" First name"
						required
						value={user.firstName}
					></input>

					<label>Last name</label>
					<input
						onChange={(e) => setUser({ ...user, lastName: e.target.value })}
						type="text"
						placeholder=" Last name"
						required
						value={user.lastName}
					></input>

					<label>Password</label>
					<input
						onChange={(e) => setUser({ ...user, password: e.target.value })}
						type="password"
						placeholder=" Password"
						required
						value={user.password}
					></input>

					<label>Confirm password</label>
					<input
						onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
						type="password"
						placeholder=" Confirm password"
						required
						value={user.confirmPassword}
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
