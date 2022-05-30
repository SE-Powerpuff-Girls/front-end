import Navbar from "./Navbar";
import styles from "./CreateConferencePage.module.css";
import Footer from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateConferencePage = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [url, setUrl] = useState("");
	const [contactInformation, setContactInformation] = useState("");

	const [selectedFile, setSelectedFile] = useState("");

	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const handleCreateConference = (e) => {
		e.preventDefault();
		const userid = JSON.parse(localStorage.getItem("user")).userid;
		const conference = { creatorid: userid, name: title, url, subtitles: description, contactInformation };
		const token = localStorage.getItem("token");
		const formData = new FormData();
		for (const key in conference) {
			formData.append(key, conference[key]);
		}
		console.log(selectedFile);
		formData.append("file", selectedFile);
		fetch(`${process.env.REACT_APP_API_LINK}conferences/`, {
			method: "POST",
			headers: { authorization: `Bearer ${token}` },
			body: formData,
		})
			.then((response) => {
				if (response.status === 201) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				const conferenceID = data.conferenceid;
				navigate(`/conferencepage/:${conferenceID}`);
			})
			.catch((error) => {
				console.error("Error sending data: ", error);
				setError(error);
			});
	};

	if (error) {
		return "Error...";
	}

	return (
		<div className={styles["conference-page"]}>
			<Navbar />
			<div className={styles["conference-papers-thumbnail"]}></div>
			<div className={styles["create-conference-container"]}>
				<form className={styles["create-conference-form"]}>
					<div className={styles["lable-input"]}>
						<label>Title: </label>
						<input type="text" required placeholder="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
					</div>

					<div className={styles["lable-input"]}>
						<label>Description: </label>
						<textarea
							type="text"
							className={styles["description"]}
							required
							placeholder="Conference description"
							onChange={(e) => setDescription(e.target.value)}
							value={description}
						></textarea>
					</div>

					<div className={styles["lable-input"]}>
						<label>Url: </label>
						<input type="url" required placeholder="Link" value={url} onChange={(e) => setUrl(e.target.value)}></input>
					</div>

					<div className={styles["lable-input"]}>
						<label>Contact information: </label>
						<textarea
							type="text"
							required
							placeholder="Contact information"
							onChange={(e) => setContactInformation(e.target.value)}
							value={contactInformation}
						></textarea>
					</div>
					<div className={styles["lable-input"]}>
						<label>Image: </label>
						<input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])}></input>
					</div>
					<button type="submit" onClick={handleCreateConference} className={styles["submit-button"]}>
						Create conference
					</button>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default CreateConferencePage;
