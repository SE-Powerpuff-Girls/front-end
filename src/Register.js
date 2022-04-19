import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Register = () => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	return (
		<div className="register-page">
			<Navbar />

			<div className="register-container">
				<h2>Register</h2>
				<form>
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
					<div className="checkbox-terms">
						<input type="checkbox" required></input>
						<span>
							I hereby agree to <Link to="/">terms and conditions</Link>
						</span>
					</div>
					<button>Register</button>
				</form>
				<Link to="/login" className="has-account">
					I already have an account
				</Link>
			</div>
		</div>
	);
};

export default Register;
