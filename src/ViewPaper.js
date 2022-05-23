import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ViewPaper.module.css";

const ViewPaper = () => {
	const pathname = window.location.pathname;
	const paperid = pathname.split(":").slice(-1)[0];
	const [isReviewer, setIsReviewer] = useState(false);

	const [readData, setReadData] = useState(false);

	const [paperVersions, setPaperVersions] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (!readData) {
			setReadData(true);

			const token = localStorage.getItem("token");
			fetch(`${process.env.REACT_APP_API_LINK}/${paperid}/paperversions`, {
				method: "GET",
				headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						setPaperVersions(
							data.sort((a, b) => {
								return a.submittedat > b.submittedat;
							})
						);
					});
				}
			});
		}
	});
	const [urlFile, setUrlFile] = useState("");
	const [paperTitle, setPaperTitle] = useState("");
	const [paperVersionId, setPaperVersionId] = useState(null);
	// const [urlFile, setUrlFile] = useState(paperVersions[0].documentlink);
	// const [paperTitle, setPaperTitle] = useState(paperVersions[0].title);

	return (
		<div className={styles["review-page"]}>
			<Navbar></Navbar>
			<div className={styles["conference-papers-thumbnail"]}></div>
			<div className={styles["review-page-content"]}>
				<div className={styles["paper-information"]}>
					<div className={styles["paper-title"]}>
						<span>{paperTitle}</span>
						<img src={`${process.env.PUBLIC_URL}/Img/flag-solid.svg`} alt="flag"></img>
					</div>
					<div className={styles["paper-content"]}>
						<object data={urlFile} type="application/pdf" width="100%" height="100%">
							<p>
								Alternative text - include a link <a href={urlFile}>to the PDF!</a>
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
										onClick={() => {
											setPaperTitle(paperVersion.title);
											setUrlFile(paperVersion.documentlink);
											setPaperVersionId(paperVersion.paperversionid);
										}}
									>
										{paperVersion.version}
									</li>
								))}
							</ul>
						</div>
					</div>
					{!isReviewer && (
						<div className={styles["finish-evaluation"]}>
							<span>Review paper</span>
							<button
								className={styles["review-paper-button"]}
								onClick={() => {
									const token = localStorage.getItem("token");
									fetch(`${process.env.REACT_APP_API_LINK}${paperVersionId}/evalutions`, {
										method: "POST",
										headers: { "Content-Type": "application/json", autorization: `Bearer ${token}` },
									}).then((response) => {
										if (response.status === 201) {
											response.json().then((data) => {
												const evaluation = data;
												const evaluationid = data.evaluationid;
												localStorage.setItem("evaluationid", evaluationid);
												navigate(`/reviewpaperversion/:${paperVersionId}`);
											});
										}
									});
								}}
							>
								Review paper version
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ViewPaper;
