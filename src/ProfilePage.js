import Navbar from "./Navbar";
import styles from "./ProfilePage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";

const ProfilePage = () => {
	let { id } = useParams();
	id = id.replace(":", "");

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const [readData, setReadData] = useState(false);

	const [disabled, setDisabled] = useState(() => {
		return !(id === JSON.parse(localStorage.getItem("user")).userid);
	});

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [title, setTitle] = useState("");
	const [gender, setGender] = useState("");
	const [nationality, setNationality] = useState("");
	const [address, setAddress] = useState("");

	const [topics, setTopics] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (!readData) {
			setReadData(true);
			setLoading(false);
			fetch(`${process.env.REACT_APP_API_LINK}users/${id}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			})
				.then((response) => {
					if (response.status === 200) {
						return response.json();
					}
					throw response;
				})
				.then((data) => {
					const information = data;
					setFirstName(information.firstname);
					setLastName(information.lastname);
					setEmail(information.email);
					if (information.title) {
						setTitle(information.title);
					}
					if (information.gender) {
						setGender(information.gender);
					}
					if (information.nationality) {
						setNationality(information.nationality);
					}
					if (information.address) {
						setAddress(information.address);
					}
				})
				.catch((error) => {
					console.error("Error fetching data: ", error);
					setError(error);
				})
				.finally(() => {
					setLoading(false);
				});
			fetch(`${process.env.REACT_APP_API_LINK}users/${id}/topics`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						setTopics(data);
					});
				}
			});
		}
	}, []);

	if (loading) {
		return "Loading...";
	}
	if (error) {
		return "Error...";
	}
	const handleSubmitUpdate = (e) => {
		e.preventDefault();
		const updateUser = { email, firstName, lastName, gender, title, nationality, address };
		const token = localStorage.getItem("token");
		const userid = JSON.parse(localStorage.getItem("user")).userid;
		fetch(`${process.env.REACT_APP_API_LINK}users/${userid}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify(updateUser),
		}).then((response) => {
			if (response.status === 200) {
				console.log("Update sucessful");
			}
		});
	};

	function handleSubmitDelete(e) {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const userid = JSON.parse(localStorage.getItem("user")).userid;
		fetch(`${process.env.REACT_APP_API_LINK}users/${userid}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		}).then((response) => {
			if (response.status === 200) {
				console.log("User deleted!");
				localStorage.clear();
				navigate("/login");
			}
		});
	}

	return (
		<div className={styles["profile-page"]}>
			<Navbar />
			<div className={styles["profile-page-container"]}>
				<div className={styles["profile-container"]}>
					<div className={styles["profile-header"]}>
						<div className={styles["profile-picture"]}></div>
						<div className={styles["name-and-interests"]}>
							<span>
								{firstName} {lastName}
							</span>
							<br></br>
							<br></br>
							Interested in:
							<div className={styles["tags"]}>
								{topics.map((topic) => (
									<div className={styles["tag"]}>{topic.name}</div>
								))}
							</div>
						</div>
					</div>
					<div className={styles["profile-information"]}>
						<form onSubmit={handleSubmitUpdate} className={styles["form-update-profile-information"]}>
							<div className={styles["label-input"]}>
								<label>Email: </label>
								<input disabled={disabled} onChange={(e) => setEmail(e.target.value)} type="email" name="email" required value={email}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>First name: </label>
								<input disabled={disabled} onChange={(e) => setFirstName(e.target.value)} type="text" required value={firstName}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Last name: </label>
								<input disabled={disabled} onChange={(e) => setLastName(e.target.value)} type="text" required value={lastName}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Title: </label>
								<input disabled={disabled} onChange={(e) => setTitle(e.target.value)} type="text" value={title}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Gender: </label>
								<input disabled={disabled} onChange={(e) => setGender(e.target.value)} type="text" value={gender}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Nationality: </label>
								<input disabled={disabled} onChange={(e) => setNationality(e.target.value)} type="text" value={nationality}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Address: </label>
								<input disabled={disabled} onChange={(e) => setAddress(e.target.value)} type="text" value={address}></input>
							</div>
							<div className={styles["buttons"]}>
								{!disabled && <button type="submit">Save</button>}
								{!disabled && <button onClick={handleSubmitDelete}>Delete</button>}
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};
export default ProfilePage;
