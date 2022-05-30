import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ViewPaper.module.css";

const ViewPaper = () => {
	const { state } = useLocation();
	const [paperid] = useState(state.paperid);
	const [conferenceID] = useState(state.conferenceID);
	const [role] = useState(state.role);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const [keywords, setKeywords] = useState([]);

	const [evaluation, setEvaluation] = useState("");

	const [currentPaperVersion, setCurrentPaperVersion] = useState("");

	const [paperVersions, setPaperVersions] = useState([]);

	const [rendModalCreateConflict, setRendModalCreateConflict] = useState(false);

	const [conflict, setConflict] = useState("");

	const [comments, setComments] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}papers/${paperid}/paperversions`, {
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
				setPaperVersions(data);
				setCurrentPaperVersion(data[0]);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	useEffect(() => {
		if (currentPaperVersion) {
			const token = localStorage.getItem("token");
			fetch(`${process.env.REACT_APP_API_LINK}paperversions/${currentPaperVersion.paperversionid}/keywords`, {
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
					console.log("Error fetching data: ", error);
					setError(true);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [currentPaperVersion]);

	useEffect(() => {
		if (currentPaperVersion) {
			const token = localStorage.getItem("token");
			fetch(`${process.env.REACT_APP_API_LINK}paperversions/${currentPaperVersion.paperversionid}/publiccomments`, {
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
					setComments(data);
				})
				.catch((error) => {
					console.log("Error fetching data: ", error);
					setError(true);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [currentPaperVersion]);

	const handleReviewPaperVersion = (e) => {
		e.preventDefault();
		// create evaluation
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}paperversions/${currentPaperVersion.paperversionid}/evaluations`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.status === 201) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				setEvaluation(data);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
		console.log("createdEvaluation");
	};

	useEffect(() => {
		if (evaluation) {
			navigate("/reviewpaperversion", { state: { evaluation, paperversion: currentPaperVersion } });
		}
	}, [evaluation]);

	const handleAddConflict = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const userID = JSON.parse(localStorage.getItem("user")).userid;
		fetch(`${process.env.REACT_APP_API_LINK}papers/${paperid}/conflictofinterests`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ description: conflict, reviewerID: userID }),
		})
			.then((response) => {
				if (response.status !== 201) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			});
		setConflict("");
		setRendModalCreateConflict(false);
	};

	if (isLoading) {
		return "Loading";
	}
	if (error) {
		return "Error";
	}

	return (
		<div className={styles["review-page"]}>
			<Navbar></Navbar>
			{rendModalCreateConflict && role === "Reviewer" && (
				<div className={styles["modal"]} style={{ display: "block" }}>
					<div className={styles["modal-container"]}>
						<h2>Create conflict</h2>
						<form onSubmit={handleAddConflict}>
							<div className={styles["label-input"]}>
								<label>Conflict description: </label>
								<textarea type="text" onChange={(e) => setConflict(e.target.value)} placeholder="Conflict..." required value={conflict}></textarea>
							</div>

							<button type="submit">Submit conflict</button>
						</form>
						<button type="reset" onClick={() => setRendModalCreateConflict(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
			<div className={styles["conference-papers-thumbnail"]}></div>
			<div className={styles["review-page-all"]}>
				<div className={styles["review-page-content"]}>
					<div className={styles["paper-information"]}>
						<div className={styles["paper-title"]}>
							<span>{currentPaperVersion.title}</span>
							<img onClick={() => setRendModalCreateConflict(true)} src={`${process.env.PUBLIC_URL}/Img/flag-solid.svg`} alt="flag"></img>
						</div>
						<div className={styles["topics"]}>
							{keywords.map((keyword) => (
								<p key={keyword.keywordid} className={styles["topic"]}>{keyword.text}</p>
							))}
						</div>
						<div className={styles["paper-content"]}>
							<object data={currentPaperVersion.documentlink} width="100%" height="100%">
								<p>
									Alternative text - include a link <a href={currentPaperVersion.documentlink}>to the PDF!</a>
								</p>
							</object>
						</div>
					</div>
					<div className={styles["evaluate-paper"]}>
						<div className={styles["review-paper"]}>
							<span id={styles["review-this-paper"]}>Paper versions</span>
							<div>
								<ul>
									{paperVersions.map((paperVersion) => (
										<li
											key={paperVersion.paperversionid}
											onClick={() => {
												setCurrentPaperVersion(paperVersion);
											}}
										>
											{paperVersion.title}
										</li>
									))}
								</ul>
							</div>
						</div>
						{role === "Reviewer" && (
							<div className={styles["finish-evaluation"]}>
								<span>Review paper</span>
								<button className={styles["review-paper-button"]} onClick={handleReviewPaperVersion}>
									Review paper version
								</button>
							</div>
						)}
						{role === "Author" && (
							<div className={styles["add-paper-version"]}>
								<span>Add paper version</span>
								<button
									className={styles["review-paper-button"]}
									onClick={() => navigate("/addpaperversion", { state: { conferenceID, role, paperid } })}
								>
									Add paper version
								</button>
							</div>
						)}
					</div>
				</div>
				<br></br>
				<div>
					<h2>Comments from existing evalutions</h2>
					<div className={styles["Comments"]}>
						{comments.map((comment) => (
							<p key={comment.commentid}>{comment.comment}</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewPaper;
