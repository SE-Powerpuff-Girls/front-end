import { useState } from "react";

const Register = () => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	return (
		<div className="register">
			<h2>Register</h2>
			<form>
				<label>First name</label>
				<input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder=" First name" required value={firstName}></input>

				<label>Last name</label>
				<input onChange={(e) => setLastName(e.target.value)} type="text" placeholder=" Last name" required value={lastName}></input>

				<label>Email</label>
				<input onChange={(e) => setEmail(e.target.value)} type="email" placeholder=" Email" required value={email}></input>

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

				<label>Agree to terms and conditions</label>
				<input type="checkbox" required></input>
				<button>Sign up</button>
			</form>
		</div>
	);
};

export default Register;
