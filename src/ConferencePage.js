import { useEffect, useState } from "react";
import styles from "./ConferencePage.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ConferencePage = () => {
	const pathname = window.location.pathname;
	const conferenceid = pathname.split(":").slice(-1)[0];

	const userid = JSON.parse(localStorage.getItem("user")).userid;

	const [conference, setConference] = useState(null);
	const [readData, setReadData] = useState(false);
	const [papers, setPapers] = useState([]);
	const [topics, setTopics] = useState([]);
	const [chairs, setChairs] = useState([]);
	const [rendModal, setRendModal] = useEffect(false);
	const [newTopic, setNewtopic] = useState("");
	const [availableSessions, setAvailableSessions] = useState([]);

	useEffect(() => {
		if (!readData) {
			setReadData(true);
			fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceid}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						setConference(data);
					});
				}
			});
			fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceid}/papers/public`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						setPapers(data);
					});
				}
			});
			fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceid}/topics`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						setTopics(data);
					});
				}
			});
			fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceid}/participants/chairs`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						setChairs(data);
					});
				}
			});
			fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceid}/conferencesessions`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						setAvailableSessions(data);
					});
				}
			});
		}
	}, [readData]);
	const [isChair, setIsChair] = useState(() => {
		chairs.forEach((chair) => {
			if (chair.userid === userid) {
				return true;
			}
			return false;
		});
	});

	const handleDeleteTopic = (topicID) => {
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceid}/topics/${topicID}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		}).then((response) => {
			if (response.status == 201) {
				console.log("Topic deleted!");
				setReadData(false);
			}
		});
	};

	const handleRendModal = (e) => {
		e.preventDefault();
		setNewtopic("");
		setRendModal(!rendModal);
	};

	const handleAddTopic = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const text = newTopic;
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceid}/topics`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ text }),
		}).then((response) => {
			if (response.status == 201) {
				console.log("Topic added successfully!");
				setReadData(false);
			}
		});
		setRendModal(!rendModal);
	};

	return (
		<div className={styles["conference-page"]}>
			<Navbar></Navbar>
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
			<div className={styles["main-image"]}></div>
			<div className={styles["conference-details"]}>
				<div className={styles["conference-image"]}></div>
				<div className={styles["conference-information"]}>
					<div className={styles["conference-identifiers"]}>
						<span className={styles["conference-title"]}>{conference.title}</span>
						<span className={styles["conference-location"]}>Conference Location</span>
						<span className={styles["conference-date"]}>Date: 22.05.2024</span>
					</div>
					<div className={styles["topics-see-more"]}>
						<div className={styles["topics"]}>
							{topics.map((topic) => (
								<div className={styles["topic"]}>
									{topic.name}
									{isChair && (
										<span
											onClick={(e) => {
												e.preventDefault();
												handleDeleteTopic(topic.conferencetopicid);
											}}
										>
											X
										</span>
									)}
								</div>
							))}
							<div onClick={handleRendModal} className={styles["topic"]}>
								+
							</div>
						</div>
						<button className={styles["button-style"]}>See Papers</button>
					</div>
					<div className={styles["conference-url"]}>
						<b>URL:</b>
						{conference.url}
					</div>
				</div>
			</div>
			<div className={styles["conference-presentation"]}>
				<h1>Presentation</h1>
				<p>
					Organic growth create spaces to explore what's next. Lean into that problem player-coach but we need to get the vernacular right turd
					polishing, but run it up the flagpole, ping the boss and circle back nor feed the algorithm. The closest elephant is the most dangerous this
					proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables close the loop
					note for the previous submit: the devil should be on the left shoulder out of the loop. Rehydrate the team i've been doing some research
					this morning and we need to better nor optimize the fireball. Increase the resolution, scale it up we need a larger print.
				</p>
			</div>

			<div className={styles["available-sessions"]}>
				<h1>Available Sessions</h1>
				<div className={styles["sessions"]}>
					{availableSessions.map((session) => (
						<div className={styles["session-card"]}>
							<p>
								<b>{session.name}</b>
							</p>
							<p>{session.description}</p>
						</div>
					))}
				</div>
			</div>

			<div className={styles["conference-chairs"]}>
				<h1>Chairs</h1>
				<div className={styles["chairs-list"]}>
					{chairs.map((chair) => {
						const chairid = chair.userid;
						let fullname = null;
						fetch(`${process.env.REACT_APP_API_LINK}conferences/participans/${chairid}`, {
							method: "GET",
							headers: { "Content-Type": "application/json" },
						}).then((response) => {
							if (response.status === 200) {
								response.json().then((data) => {
									fullname = `${data.firstname} ${data.lastname}`;
								});
							}
						});
						return (
							<div className={styles["chair"]}>
								<img src={`${process.env.PUBLIC_URL}/Img/profilePicture.png`}></img>
								{fullname}
							</div>
						);
					})}
				</div>
			</div>

			{/* only for registered user 
				author - their own papers
				reviewer - papers to review
			*/}
			<div className={styles["focused-papers"]}></div>

			{/* only for registered user 
				author - public papers (accepted papers)
				reviewer + chairs - all papers
			*/}
			<div className={styles["all-papers"]}></div>

			<div className={styles["action-buttons"]}>
				{/* only for registered user - author only */}
				<button className={styles["button-style"]}>Add Paper</button>

				{/* only for registered user - chair only */}
				<button className={styles["button-style"]}>Edit Conference</button>

				{/* only for UNREGISTERED user */}
				<button className={styles["button-style"]}>Register</button>
			</div>

			<Footer />
		</div>
	);
};

export default ConferencePage;
