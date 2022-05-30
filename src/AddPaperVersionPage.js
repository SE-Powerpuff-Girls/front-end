import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AddPaperVersionPage.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AddPaperVersionPage = () => {
	const { state } = useLocation();
	const [conferenceID] = useState(state.conferenceID);
	const [role] = useState(state.role);
	const [paperid] = useState(state.paperid);
	const [selectedFile, setSelectedFile] = useState("");
	const [title, setTitle] = useState("");
	const [abstract, setAbstract] = useState("");

	const [paperVersion, setPaperVersion] = useState("");

	const [keywords, setKeywords] = useState([]);
	const [newKeyword, setNewKeyword] = useState("");

	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const handleAddVersion = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("file", selectedFile);
		formData.append("title", title);
		formData.append("abstract", abstract);
		console.log(formData);
		fetch(`${process.env.REACT_APP_API_LINK}papers/${paperid}/paperversions`, {
			method: "POST",
			headers: { authorization: `Bearer ${token}` },
			body: formData,
		})
			.then((response) => {
				if (!response.status === 201) {
					throw response;
				}
				return response.json();
			})
			.then((data) => {
				setPaperVersion(data);
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			});
	};

	useEffect(() => {
		if (paperVersion) {
			const token = localStorage.getItem("token");
			fetch(`${process.env.REACT_APP_API_LINK}paperversions/${paperVersion.paperversionid}`, {
				method: "GET",
				headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			})
				.then((response) => {
					if (response.status === 200) {
						return response.json();
					}
					throw response;
				})
				.then((data) => {
					setKeywords(data);
				})
				.catch((error) => {
					console.log("Error sending data: ", error);
					setError(true);
				});
		}
	}, [keywords]);

	const handleDeleteKeyword = (keywordid) => {
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}paperversions/${paperVersion.paperversionid}/keywords/${keywordid}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (!response.status === 200) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			});
	};

	const handleAddKeyword = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}paperversions/${paperVersion.paperversionid}/keywords`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ keyword: newKeyword }),
		})
			.then((response) => {
				if (response.status !== 201) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			});
		setNewKeyword("");
	};
	if (error) {
		return "Error...";
	}

	return (
		<div className={styles["add-paper-version-page"]}>
			<Navbar />
			<div className={styles["main-image"]}></div>
			{!paperVersion && (
				<div className={styles["add-paper-version-container"]}>
					<div className={styles["add-version"]}>
						<h2>Add a new paper version</h2>
						<form onSubmit={handleAddVersion}>
							<div className={styles["label-input"]}>
								<label>Title: </label>
								<input onChange={(e) => setTitle(e.target.value)} type="text" required placeholder="Enter a title..." value={title}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Abstract: </label>
								<textarea
									onChange={(e) => setAbstract(e.target.value)}
									type="text"
									required
									placeholder="Enter an abstract..."
									value={abstract}
								></textarea>
							</div>
							<div className={styles["label-input"]}>
								<input type="file" onChange={(e) => setSelectedFile(e.target.files[0])}></input>
							</div>
							<button type="submit">Add paper version</button>
							<button onClick={() => navigate(-1)}>Cancel</button>
						</form>
					</div>
				</div>
			)}
			{paperVersion && (
				<div className={styles["keywords"]}>
					<h3>Keywords: </h3>
					{keywords.map((keyword) => (
						<div key={keyword.keywordid} className={styles["keyword"]}>
							{keyword.text}
							{role === "Author" && (
								<span
									onClick={(e) => {
										e.preventDefault();
										handleDeleteKeyword(keyword.keywordid);
									}}
								>
									X
								</span>
							)}
						</div>
					))}
					{role === "Author" && (
						<div className={styles["add-keyword"]}>
							<input type="text" onChange={(e) => setNewKeyword(e.target.value)} placeholder="Keyword..." required value={newKeyword}></input>
							<button onClick={handleAddKeyword}>+</button>
							<button onClick={() => navigate(-1)}>Done</button>
						</div>
					)}
				</div>
			)}
			<Footer />
		</div>
	);
};

export default AddPaperVersionPage;
