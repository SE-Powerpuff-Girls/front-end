import React from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import styles from "./ConferencePapers.module.css";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const OnePaper = ({ paperid }) => {
	const { state } = useLocation();
	const [role] = useState(state.role);
	const [conference, setConference] = useState(state.conference);
	const [paperVersions, setPaperVersions] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [currentPaperVersion, setCurrentPaperVersion] = useState("");
	const [keywords, setKeywords] = useState([]);
	const [authors, setAuthors] = useState([]);

	const navigate = useNavigate();

	useEffect(async () => {
		const token = localStorage.getItem("token");
		await fetch(`${process.env.REACT_APP_API_LINK}papers/${paperid}/paperversions`, {
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
		fetch(`${process.env.REACT_APP_API_LINK}papers/${paperid}/authors/names`, {
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
				setAuthors(data);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [currentPaperVersion]);

	if (isLoading) {
		return "Loading";
	}
	if (error) {
		return "Error";
	}

	return (
		<div className={styles["one-paper"]}>
			<div className={styles["paper-header"]}>
				<div className={styles["paper-details"]}>
					<h2>{currentPaperVersion.title}</h2>
					<div className={styles["topics"]}>
						{keywords.map((keyword) => (
							<div key={keyword.keywordid} className={styles["topic"]}>
								{keyword.text}
							</div>
						))}
					</div>
				</div>
				<div className={styles["paper-authors"]}>
					<span>Authors: </span>
					<ul>
						{authors.map((author) => (
							<li key={`${author.firstname}${author.lastname}`}>
								{author.firstname} {author.lastname}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={styles["paper-content"]}>
				<h3>Abstract</h3>
				<p>{currentPaperVersion.abstract}</p>
			</div>
			<button
				className={styles["see-more-button"]}
				onClick={() => {
					navigate("/viewpaper", { state: { conferenceID: conference.conferenceid, paperid, role } });
				}}
			>
				See more
			</button>
		</div>
	);
};

const ConferencePapers = () => {
	const { state } = useLocation();
	const [conference, setConference] = useState(state.conference);
	const [topics, setTopics] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [papers, setPapers] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conference.conferenceid}/topics`, {
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
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [topics]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conference.conferenceid}/papers/public`, {
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
				setPapers(data);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	if (isLoading) {
		return "Loading";
	}
	if (error) {
		return "Error";
	}
	return (
		<div className={styles["conference-papers-page"]}>
			<Navbar></Navbar>
			<div className={styles["conference-papers-thumbnail"]}></div>
			<div className={styles["conference-details"]}>
				<div className={styles["conference-thumbnail"]}>
					<img
						src={`${conference.photolink}` || `${process.env.PUBLIC_URL}/Img/thumbnailConference.jpg`}
						alt="Image"
						height="100%"
						width="100%"
					></img>
				</div>
				<div className={styles["conference-information"]}>
					<div className={styles["conference-identifiers"]}>
						<span className={styles["conference-title"]}>{conference.name}</span>
						<span className={styles["conference-date"]}>{"Date: 22-04-2023"}</span>
					</div>
					<div className={styles["topics"]}>
						{topics.map((topic) => (
							<div key={topic.conferencetopicid} className={styles["topic"]}>
								{topic.text}
							</div>
						))}
					</div>
					<div className={styles["conference-url"]}>
						<b>URL:</b>
						{conference.url}
					</div>
				</div>
			</div>
			<div className={styles["conference-papers"]}>
				<h3>Papers</h3>
				<div className={styles["available-papers"]}>
					{papers.map((paper) => (
						<OnePaper key={paper.paperid} paperid={paper.paperid}></OnePaper>
					))}
				</div>
			</div>
		</div>
	);
};

export default ConferencePapers;
