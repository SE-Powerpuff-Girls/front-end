import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styles from "./ReviewPaperVersion.module.css";

const ReviewPaperVersion = () => {
	const [addComment, setAddComment] = useState("");
	const evaluationid = localStorage.getItem("evaluation");

	const pathname = window.location.pathname;
	const paperversionid = pathname.split(":").slice(-1)[0];

	const [readData, setReadData] = useState(false);

	const [urlDocument, setUrlDocument] = useState("");
	const [title, setTitle] = useState("");

	const [comments, setComments] = useState([]);

	useEffect(() => {
		if (!readData) {
			setReadData(true);
			const token = localStorage.getItem("token");
			fetch(`${process.env.REACT_APP_API_LINK}paperversions/${paperversionid}`, {
				method: "GET",
				headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						const information = data;
						setUrlDocument(information.documenturl);
						setTitle(information.title);
					});
				}
			});
			fetch(`${proces.env.REACT_APP_API_LINK}evaluations/${evaluationid}/comments`, {
				method: "GET",
				headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						setComments(data);
					});
				}
			});
		}
	}, [readData]);

	return (
		<div className={styles["review-page"]}>
			<Navbar></Navbar>
			<div className={styles["conference-papers-thumbnail"]}></div>
			<div className={styles["review-page-content"]}>
				<div className={styles["paper-information"]}>
					<div className={styles["paper-title"]}>
						<span>{title}</span>
						<img src={`${process.env.PUBLIC_URL}/Img/flag-solid.svg`} alt="flag"></img>
					</div>
					<section className={styles["paper-content"]}>
						<object data={urlDocument} type="application/pdf" width="100%" height="100%">
							<p>
								Alternative text - include a link <a href={urlDocument}>to the PDF!</a>
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
									<li>{comment}</li>
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
							<button
								onClick={() => {
									const token = localStorage.getItem("token");
									fetch(`${process.env.REACT_APP_API_LINK}evaluations/${evaluationid}/comments`, {
										method: "POST",
										headers: { "Content-Type": "application/json", autorization: `Bearer ${token}`, body: { comment: { addComment } } },
									}).then((response) => {
										if (response.status === 201) {
											setAddComment("");
											setReadData(false);
										}
									});
								}}
							>
								Add comment
							</button>
						</form>
					</div>
					<div className={styles["finish-evaluation"]}>
						<span>Finish Evaluation</span>
						<button>Send all X comments</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewPaperVersion;
