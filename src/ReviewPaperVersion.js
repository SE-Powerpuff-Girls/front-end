import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./ReviewPaperVersion.module.css";

const ReviewPaperVersion = () => {
	const { state } = useLocation();
	const [addComment, setAddComment] = useState("");
	const [evaluation] = useState(state.evaluation);

	const [paperVersion] = useState(state.paperversion);

	const [keywords, setKeywords] = useState([]);

	const [reloadComms, setReloadComms] = useState(false);

	const [comments, setComments] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}evaluations/${evaluation.evaluationid}/comments`, {
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
	}, [reloadComms]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}paperversions/${paperVersion.paperversionid}/keywords`, {
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
	}, []);

	const handleAddComment = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		await fetch(`${process.env.REACT_APP_API_LINK}evaluations/${evaluation.evaluationid}/comments`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ comment: addComment }),
		})
			.then((response) => {
				if (!response.status === 201) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setReloadComms(!reloadComms);
		setAddComment("");
	};

	const handleDeleteComment = async (commentid) => {
		const token = localStorage.getItem("token");
		await fetch(`${process.env.REACT_APP_API_LINK}evaluations/${evaluation.evaluationid}/comments/${commentid}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.status !== 200) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			});
		setReloadComms(!reloadComms);
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
			<div className={styles["conference-papers-thumbnail"]}></div>
			<div className={styles["review-page-content"]}>
				<div className={styles["paper-information"]}>
					<div className={styles["paper-title"]}>
						<span>{paperVersion.title}</span>
						<img src={`${process.env.PUBLIC_URL}/Img/flag-solid.svg`} alt="flag"></img>
					</div>
					<div className={styles["topics"]}>
						{keywords.map((keyword) => (
							<p className={styles["topic"]}>{keyword.text}</p>
						))}
					</div>
					<section className={styles["paper-content"]}>
						<object data={paperVersion.documentlink} width="100%" height="100%">
							<p>
								Alternative text - include a link <a href={paperVersion.documentlink}>to the PDF!</a>
							</p>
						</object>
					</section>
				</div>
				<div className={styles["evaluate-paper"]}>
					<div className={styles["review-paper"]}>
						<span id={styles["review-this-paper"]}>Review this paper</span>
						<span>Add to evaluation/ public Comment</span>
						<div>
							<ul>
								{comments.map((comment) => (
									<li className={styles["comment"]}>
										{comment.comment}
										<span
											onClick={(e) => {
												e.preventDefault();
												handleDeleteComment(comment.commentid);
											}}
										>
											X
										</span>
									</li>
								))}
							</ul>
						</div>
						<form>
							<textarea
								type="text"
								onChange={(e) => setAddComment(e.target.value)}
								required
								placeholder="Enter your comment..."
								value={addComment}
							></textarea>
							<button className={styles["button-style"]} onClick={handleAddComment}>
								Add comment
							</button>
						</form>
					</div>
					<div className={styles["finish-evaluation"]}>
						<span>Finish Evaluation</span>
						<button
							onClick={() => {
								navigate(-1);
							}}
							className={styles["button-style"]}
						>
							Finish evaluation
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewPaperVersion;
