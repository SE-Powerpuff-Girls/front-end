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
	const [isLoading, setIsLoading] = useState(true);

	const [disabled] = useState(() => {
		return !(id === JSON.parse(localStorage.getItem("user")).userid);
	});

	const [user, setUser] = useState({ firstname: "", lastname: "", email: "", title: "", gender: "", nationality: "", address: "", photolink: "" });

	const [topics, setTopics] = useState([]);

	const [rendModal, setRendModal] = useState(false);

	const [newTopic, setNewtopic] = useState("");

	const [reloadTopics, setReloadTopics] = useState(true);

	const [selectedFile, setSelectedFile] = useState("");

	const navigate = useNavigate();

	const [loadData, setLoadData] = useState(false);

	useEffect(() => {
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
				setUser(information);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [loadData]);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_LINK}users/${id}/topics`, {
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
				setTopics(data);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [reloadTopics]);

	const handleSubmitUpdate = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const userid = JSON.parse(localStorage.getItem("user")).userid;
		const formData = new FormData();
		for (const key in user) {
			formData.append(key, user[key]);
		}
		formData.append("file", selectedFile);
		await fetch(`${process.env.REACT_APP_API_LINK}users/${userid}`, {
			method: "PUT",
			headers: { authorization: `Bearer ${token}`, upload: null },
			body: formData,
		})
			.then((response) => {
				if (response.status === 201) {
					console.log("Update sucessful");
				} else {
					throw response;
				}
			})
			.catch((error) => {
				console.error("Error sending data: ", error);
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setLoadData(!loadData);
	};

	function handleSubmitDelete(e) {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const userid = JSON.parse(localStorage.getItem("user")).userid;
		fetch(`${process.env.REACT_APP_API_LINK}users/${userid}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.status === 200) {
					console.log("User deleted!");
					localStorage.clear();
					navigate("/login");
				} else {
					throw response;
				}
			})
			.catch((error) => {
				console.error("Error deleting data: ", error);
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	const handleRendModal = (e) => {
		e.preventDefault();
		setNewtopic("");
		setRendModal(!rendModal);
	};

	const handleAddTopic = (e) => {
		e.preventDefault();
		const userid = JSON.parse(localStorage.getItem("user")).userid;
		const token = localStorage.getItem("token");
		const name = newTopic;
		fetch(`${process.env.REACT_APP_API_LINK}users/${userid}/topics`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ name }),
		})
			.then((response) => {
				if (response.status === 201) {
					console.log("Topic added successfully!");
					setReloadTopics(!reloadTopics);
				} else {
					throw response;
				}
			})
			.catch((error) => {
				console.error("Error sending data: ", error);
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setRendModal(!rendModal);
	};

	const handleDeleteTopic = (topicID) => {
		const userid = JSON.parse(localStorage.getItem("user")).userid;
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}users/${userid}/topics/${topicID}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.status === 201) {
					console.log("Topic deleted!");
					setReloadTopics(!reloadTopics);
				} else {
					throw response;
				}
			})
			.catch((error) => {
				console.error("Error deleting data: ", error);
				setError(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setReloadTopics(!reloadTopics);
	};
	console.log(user);
	if (isLoading) {
		return "Loading...";
	}
	if (error) {
		return "Error...";
	}

	return (
		<div className={styles["profile-page"]}>
			<Navbar />
			{rendModal && (
				<div className={styles["modal"]} style={{ display: "block" }}>
					<div className={styles["modal-container"]}>
						<h2>Add new topic</h2>
						<form onSubmit={handleAddTopic}>
							<div className={styles["label-input"]}>
								<label>Topic: </label>
								<input type="text" onChange={(e) => setNewtopic(e.target.value)} placeholder="Example: DSA" required value={newTopic}></input>
							</div>

							<button type="submit">Add topic</button>
						</form>
						<button type="reset" onClick={() => setRendModal(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
			<div className={styles["profile-page-container"]}>
				<div className={styles["profile-container"]}>
					<div className={styles["profile-header"]}>
						<div className={styles["profile-picture"]}>
							<img src={`${user.photolink}` || `${process.env.PUBLIC_URL}/Img/profilePicture.jpg`} alt="" height="100%" width="100%"></img>
						</div>
						<div className={styles["name-and-interests"]}>
							<span>
								{user.firstname} {user.lastname}
							</span>
							<br></br>
							<br></br>
							Interested in:
							<div className={styles["tags"]}>
								{topics.map((topic) => (
									<div key={topic.usertopicid} className={styles["tag"]}>
										{topic.name}
										{!disabled && (
											<span
												onClick={(e) => {
													e.preventDefault();
													handleDeleteTopic(topic.usertopicid);
												}}
											>
												X
											</span>
										)}
									</div>
								))}
								{!disabled && (
									<div onClick={handleRendModal} className={styles["tag"]}>
										+
									</div>
								)}
							</div>
						</div>
					</div>
					<div className={styles["profile-information"]}>
						<form onSubmit={handleSubmitUpdate} className={styles["form-update-profile-information"]}>
							<div className={styles["label-input"]}>
								<label>Email: </label>
								<input
									disabled
									onChange={(e) => setUser({ ...user, email: e.target.value })}
									type="email"
									name="email"
									required
									value={user.email || ""}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>First name: </label>
								<input
									disabled={disabled}
									onChange={(e) => setUser({ ...user, firstname: e.target.value })}
									type="text"
									required
									value={user.firstname || ""}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Last name: </label>
								<input
									disabled={disabled}
									onChange={(e) => setUser({ ...user, lastname: e.target.value })}
									type="text"
									required
									value={user.lastname || ""}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Title: </label>
								<input disabled={disabled} onChange={(e) => setUser({ ...user, title: e.target.value })} type="text" value={user.title || ""}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Gender: </label>
								<input
									disabled={disabled}
									onChange={(e) => setUser({ ...user, gender: e.target.value })}
									type="text"
									value={user.gender || ""}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Nationality: </label>
								<input
									disabled={disabled}
									onChange={(e) => setUser({ ...user, nationality: e.target.value })}
									type="text"
									value={user.nationality || ""}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Address: </label>
								<input
									disabled={disabled}
									onChange={(e) => setUser({ ...user, address: e.target.value })}
									type="text"
									value={user.address || ""}
								></input>
							</div>
							<div className={styles["lable-input"]}>
								<label>Image: </label>
								<input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])}></input>
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
