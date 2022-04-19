import { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="login">
			<h2>Login</h2>
			<form>
				<label>Email:</label>
				<input onChange={(e) => setEmail(e.target.value)} type="email" value={email} required placeholder=" Enter your email..."></input>
				<label>Password:</label>
				<input onChange={(e) => setPassword(e.target.value)} type="password" value={password} required placeholder=" Enter your password..."></input>
				<button>Log in</button>
			</form>
		</div>
	);
};

export default Login;
