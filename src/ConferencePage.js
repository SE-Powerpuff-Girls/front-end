import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ConferencePage.module.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const ConferencePage = () => {
	const [conferenceID] = useState(window.location.pathname.split(":").slice(-1)[0]);

	const [userID] = useState(JSON.parse(localStorage.getItem("user")).userid);

	const [conference, setConference] = useState("");
	const [topics, setTopics] = useState([]);
	const [chairs, setChairs] = useState([]);
	const [rendModalNewTopic, setRendModalNewTopic] = useState(false);
	const [rendModalEditConference, setRendModalEditConference] = useState(false);
	const [rendModalRegister, setRendModalRegister] = useState(false);
	const [rendModalSession, setRendModalSession] = useState(false);
	const [rendModalSessionPapers, setRendModalSessionPapers] = useState(false);
	const [newTopic, setNewtopic] = useState("");
	const [availableSessions, setAvailableSessions] = useState([]);

	const [role, setRole] = useState("");
	const [newSessionName, setNewSessionName] = useState("");
	const [newSessionDescription, setNewSessionDescription] = useState("");

	const [registerRole, setRegisterRole] = useState("");

	const [sessionPapers, setSessionPapers] = useState([]);

	const [updatedConference, setUpdatedConference] = useState({
		name: "",
		URL: "https://www.google.com",
		subtitles: "",
		contactinformation: "",
		deadlinepapersubmission: new Date().toISOString().split("T")[0],
		deadlinepaperreview: new Date().toISOString().split("T")[0],
		deadlineacceptancenotification: new Date().toISOString().split("T")[0],
		deadlineacceptedpaperupload: new Date().toISOString().split("T")[0],
	});

	const [uploadImage, setUploadImage] = useState("");

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [addedPaper, setAddedPaper] = useState("");

	const [rendPendingPapers, setRendPendingPapers] = useState(false);
	const [pendingPapers, setPendingPapers] = useState([]);

	const [selectedPaper, setSelectedPaper] = useState("");

	const [acceptPaper, setAcceptPaper] = useState(false);

	const [selectedSession, setSelectedSession] = useState("");

	const navigate = useNavigate();

	// Getting conference data
	useEffect(async () => {
		await fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}`, {
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
				setConference(data);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [conferenceID]);

	//Getting conference topics
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/topics`, {
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
	}, [conferenceID, topics]);

	//Getting conference chairs
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/participants/chairs`, {
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
				setChairs(data);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [conferenceID]);

	//Getting conference sessions
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/conferencesessions`, {
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
				setAvailableSessions(data);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [conferenceID, availableSessions]);

	//Getting role of the current user in the confernce
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/roles/${userID}`, {
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
				setRole(data.participationtype);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	//Getting pending papers of the current conference
	useEffect(() => {
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/papers`, {
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
				setPendingPapers(data);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const handleDeleteTopic = (topicID) => {
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/topics/${topicID}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.status === 200) {
					console.log("Topic deleted!");
				} else {
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
	};

	const handleRendModalNewTopic = (e) => {
		e.preventDefault();
		setNewtopic("");
		setRendModalNewTopic(!rendModalNewTopic);
	};

	const handleRendModalEditConference = (e) => {
		e.preventDefault();
		setUpdatedConference({
			name: "",
			URL: "https://www.google.com",
			subtitles: "",
			contactinformation: "",
			deadlinepapersubmission: new Date().toISOString().split("T")[0],
			deadlinepaperreview: new Date().toISOString().split("T")[0],
			deadlineacceptancenotification: new Date().toISOString().split("T")[0],
			deadlineacceptedpaperupload: new Date().toISOString().split("T")[0],
		});
		setRendModalEditConference(!rendModalEditConference);
	};

	const handleAddTopic = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const text = newTopic;
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/topics`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ text }),
		})
			.then((response) => {
				if (response.status === 201) {
					console.log("Topic added successfully!");
				} else {
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
		setRendModalNewTopic(!rendModalNewTopic);
	};

	const handleUpdateConference = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const formData = new FormData();
		for (const key in updatedConference) {
			formData.append(key, updatedConference[key]);
		}
		formData.append("file", uploadImage);
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}`, {
			method: "PUT",
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
				setConference(data);
			})
			.catch((error) => {
				console.log("Error fetching data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setRendModalEditConference(!rendModalEditConference);
	};

	const handleRegisterConference = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/participants`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ userid: userID, participationType: registerRole }),
		})
			.then((response) => {
				if (response.status !== 201) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setRole("");
		setRendModalRegister(!rendModalRegister);
	};

	const handleAddNewSession = (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/conferencesessions`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ name: newSessionName, description: newSessionDescription }),
		})
			.then((response) => {
				if (response.status !== 201) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setNewSessionName("");
		setNewSessionDescription("");
		setRendModalSession(!rendModalSession);
	};

	const handleAddAPaper = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		await fetch(`${process.env.REACT_APP_API_LINK}conferences/${conferenceID}/papers`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ userid: userID }),
		})
			.then((response) => {
				if (response.status !== 201) {
					throw response;
				}
				return response.json();
			})
			.then((data) => {
				setAddedPaper(data);
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if (addedPaper) {
			handleNavigateAddPaper();
		}
	}, [addedPaper]);

	const handleNavigateAddPaper = () => {
		const paperid = addedPaper.paperid;
		navigate("/addpaperversion", { state: { conferenceID, role, paperid } });
	};

	const handleAcceptAndAssign = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		await fetch(`${process.env.REACT_APP_API_LINK}papers/accept/${selectedPaper.paperid}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.status !== 201) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
		await fetch(`${process.env.REACT_APP_API_LINK}conferencesessions/${selectedSession.conferencesessionid}/papers`, {
			method: "POST",
			headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
			body: JSON.stringify({ paperid: selectedPaper.paperid }),
		})
			.then((response) => {
				if (response.status !== 201) {
					throw response;
				}
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setRendPendingPapers(false);
		setSelectedPaper("");
		setAcceptPaper(false);
		setSelectedSession(false);
	};

	const handleRejectPaper = (e) => {
		e.preventDefault();
		setRendPendingPapers(false);
		setSelectedPaper("");
		setAcceptPaper(false);
		setSelectedSession(false);
	};
	if (isLoading) {
		return "Loading";
	}
	if (error) {
		return "Error";
	}

	const handleGetPapersForSession = async (conferencesessionid) => {
		await fetch(`${process.env.REACT_APP_API_LINK}conferencesessions/${conferencesessionid}/papers/final`, {
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
				setSessionPapers(data);
			})
			.catch((error) => {
				console.log("Error sending data: ", error);
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
		setRendModalSessionPapers(true);
	};

	return (
		<div className={styles["conference-page"]}>
			<Navbar></Navbar>
			{rendModalNewTopic && (
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
						<button type="reset" onClick={() => setRendModalNewTopic(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
			{rendModalEditConference && (
				<div className={styles["modal"]} style={{ display: "block" }}>
					<div className={styles["edit-conference-modal"]}>
						<h2>Edit conference</h2>
						<form onSubmit={handleUpdateConference}>
							<div className={styles["label-input"]}>
								<label>Conference title: </label>
								<input
									type="text"
									onChange={(e) => setUpdatedConference({ ...updatedConference, name: e.target.value })}
									placeholder="Conference title"
									required
									value={updatedConference.name}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>URL: </label>
								<input
									type="url"
									onChange={(e) => setUpdatedConference({ ...updatedConference, URL: e.target.value })}
									placeholder="www.google.com"
									required
									value={updatedConference.URL}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Description: </label>
								<textarea
									required
									onChange={(e) => setUpdatedConference({ ...updatedConference, subtitles: e.target.value })}
									placeholder="Description"
									value={updatedConference.subtitles}
								></textarea>
							</div>
							<div className={styles["label-input"]}>
								<label>Contact information: </label>
								<input
									type="text"
									onChange={(e) => setUpdatedConference({ ...updatedConference, contactinformation: e.target.value })}
									placeholder="Contact information"
									required
									value={updatedConference.contactinformation}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Deadline paper submission: </label>
								<input
									type="date"
									onChange={(e) => setUpdatedConference({ ...updatedConference, deadlinepapersubmission: e.target.value })}
									value={updatedConference.deadlinepapersubmission}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Deadline paper review: </label>
								<input
									type="date"
									onChange={(e) => setUpdatedConference({ ...updatedConference, deadlinepaperreview: e.target.value })}
									value={updatedConference.deadlinepaperreview}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Conference image: </label>
								<input type="file" accept="image/*" onChange={(e) => setUploadImage(e.target.files[0])}></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Deadline acceptance notification: </label>
								<input
									type="date"
									onChange={(e) => setUpdatedConference({ ...updatedConference, deadlineacceptancenotification: e.target.value })}
									value={updatedConference.deadlineacceptancenotification}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Deadline accepted paper upload: </label>
								<input
									type="date"
									onChange={(e) => setUpdatedConference({ ...updatedConference, deadlineacceptedpaperupload: e.target.value })}
									value={updatedConference.deadlineacceptedpaperupload}
								></input>
							</div>
							<button type="submit">Edit conference</button>
						</form>
						<button type="reset" onClick={() => setRendModalEditConference(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
			{rendModalRegister && (
				<div className={styles["modal"]} style={{ display: "block" }}>
					<div className={styles["modal-container"]}>
						<h2>Register to conference</h2>
						<form onSubmit={handleRegisterConference}>
							<div className={styles["label-input"]}>
								<label className={styles["label"]}>Author</label>
								<input onClick={() => setRegisterRole("Author")} type="radio" name="Role" required></input>
							</div>

							<div className={styles["label-input"]}>
								<label>Reviewer</label>
								<input onClick={() => setRegisterRole("Reviewer")} type="radio" name="Role" required></input>
							</div>

							<button type="submit">Register to conference</button>
						</form>
						<button type="reset" onClick={() => setRendModalRegister(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
			{rendModalSession && (
				<div className={styles["modal"]} style={{ display: "block" }}>
					<div className={styles["edit-conference-modal"]}>
						<h2>Add session</h2>
						<form onSubmit={handleRegisterConference}>
							<div className={styles["label-input"]}>
								<label>Session name: </label>
								<input
									onChange={(e) => setNewSessionName(e.target.value)}
									type="text"
									required
									placeholder="Session name...."
									value={newSessionName}
								></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Session description: </label>
								<textarea
									onChange={(e) => setNewSessionDescription(e.target.value)}
									type="text"
									required
									placeholder="Session descriptiion..."
									value={newSessionDescription}
								></textarea>
							</div>
							<button type="submit" onClick={handleAddNewSession}>
								Add session
							</button>
						</form>
						<button type="reset" onClick={() => setRendModalSession(false)}>
							Cancel
						</button>
					</div>
				</div>
			)}
			{rendPendingPapers && (
				<div className={`${styles["pending-papers"]}`} style={{ display: "block" }}>
					<div className={`${styles["pending-papers-container"]}`}>
						<h2>Pending papers!</h2>
						<div>
							Pending papers titles:
							<select
								onMouseLeave={(e) => {
									setSelectedPaper(JSON.parse(e.target.value));
								}}
								// onFocus={(e) => {
								// 	setSelectedPaper(JSON.parse(e.target.value));
								// }}
							>
								{pendingPapers.map((paper) => {
									return <option value={JSON.stringify(paper)}>{paper.title}</option>;
								})}
							</select>
						</div>

						<div className={styles["selected-paper"]}>
							<div className={styles["label-text"]}>
								<label>Title: </label>
								<span>{selectedPaper.title}</span>
							</div>
							<div className={styles["label-text"]}>
								<label>Abstract: </label>
								<span>{selectedPaper.abstract}</span>
							</div>
							<p>Paper file:</p>
							<section className={styles["paper-content"]}>
								<object data={selectedPaper.documentlink} type="application/pdf" width="100%" height="100%">
									<p>
										Alternative text - include a link <a href={selectedPaper.documentlink}>to the PDF!</a>
									</p>
								</object>
							</section>
						</div>
						{selectedPaper && (
							<div>
								<label>Accept paper</label>
								<input onClick={() => setAcceptPaper("acc")} type="radio" name="Acc" required></input>
								<label>Reject paper</label>
								<input onClick={() => setAcceptPaper("rej")} type="radio" name="Acc" required></input>
							</div>
						)}
						{acceptPaper === "acc" && (
							<div>
								Available sessions
								<select
									onMouseLeave={(e) => {
										setSelectedSession(JSON.parse(e.target.value));
									}}
									// onFocus={(e) => {
									// 	setSelectedPaper(JSON.parse(e.target.value));
									// }}
								>
									{availableSessions.map((session) => {
										return <option value={JSON.stringify(session)}>{session.name}</option>;
									})}
								</select>
							</div>
						)}
						{acceptPaper === "rej" && (
							<button className={styles["button-style"]} onClick={handleRejectPaper}>
								Reject paper
							</button>
						)}
						{selectedSession && (
							<button type="button" onClick={handleAcceptAndAssign} className={styles["button-style"]}>
								Accept and assign
							</button>
						)}
						<button
							className={styles["button-style"]}
							type="reset"
							onClick={() => {
								setRendPendingPapers(false);
								setSelectedPaper("");
								setAcceptPaper(false);
								setSelectedSession(false);
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			{rendModalSessionPapers && (
				<div className={styles["modal"]} style={{ display: "block" }}>
					<div className={styles["modal-container"]}>
						<h2>Papers for this session: </h2>
						<div className={styles["session-papers"]}>
							{sessionPapers.map((paper) => (
								<p>{paper.title}</p>
							))}
						</div>
						<button
							className={styles["button-style"]}
							onClick={() => {
								setRendModalSessionPapers(false);
								setSessionPapers([]);
							}}
						>
							Close
						</button>
					</div>
				</div>
			)}
			<div className={styles["main-image"]}></div>
			<div className={styles["conference-details"]}>
				<div className={styles["conference-image"]}>
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
						<span className={styles["conference-date"]}>Date: 22.05.2024</span>
					</div>
					<div className={styles["topics-see-more"]}>
						<div className={styles["topics"]}>
							{topics.map((topic) => (
								<div key={topic.conferencetopicid} className={styles["topic"]}>
									{topic.text}
									{role === "Chair" && (
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
							{role === "Chair" && (
								<div onClick={handleRendModalNewTopic} className={styles["topic"]}>
									+
								</div>
							)}
						</div>
						<button onClick={() => navigate(`/conferencepapers`, { state: { conference, role } })} className={styles["button-style"]}>
							See Papers
						</button>
					</div>
					<div className={styles["conference-url"]}>
						<b>URL:</b>
						{conference.url}
					</div>
					{conference.deadlinepapersubmission && (
						<div className={styles["deadlines"]}>
							<span>
								Deadline paper submission: <strong>{conference.deadlinepapersubmission.split("T")[0]}</strong>
							</span>
							<span>
								Deadline paper upload: <strong>{conference.deadlineacceptedpaperupload.split("T")[0]}</strong>
							</span>
							<span>
								Deadline paper review: <strong>{conference.deadlinepaperreview.split("T")[0]}</strong>
							</span>
							<span>
								Deadline acceptance notification: <strong>{conference.deadlineacceptancenotification.split("T")[0]}</strong>
							</span>
						</div>
					)}
				</div>
			</div>
			<div className={styles["conference-presentation"]}>
				<h1>Presentation</h1>
				<p>{conference.subtitles}</p>
			</div>
			<div className={styles["available-sessions"]}>
				<h1>Available Sessions</h1>
				<div className={styles["sessions"]}>
					{availableSessions.map((session) => {
						// console.log(session);
						return (
							<div
								onClick={() => handleGetPapersForSession(session.conferencesessionid)}
								key={session.conferencesessionid}
								className={styles["session-card"]}
							>
								<p>
									<b>{session.name}</b>
								</p>
								<p>{session.description}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles["conference-chairs"]}>
				<h1>Chairs</h1>
				<div className={styles["chairs-list"]}>
					{chairs.map((chair) => {
						return (
							<div key={chair.userid} className={styles["chair"]}>
								<img src={`${chair.photolink || process.env.PUBLIC_URL}/Img/profilePicture.png`} alt="Profile page"></img>
								{chair.firstname} {chair.lastname}
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
				{role === "Author" && (
					<button onClick={handleAddAPaper} className={styles["button-style"]}>
						Add Paper
					</button>
				)}

				{/* only for registered user - chair only */}
				{role === "Chair" && (
					<button className={styles["button-style"]} onClick={handleRendModalEditConference}>
						Edit Conference
					</button>
				)}

				{role === "Chair" && (
					<button onClick={() => setRendPendingPapers(true)} className={styles["button-style"]}>
						See pending papers
					</button>
				)}

				{role === "Chair" && (
					<button onClick={() => setRendModalSession(!rendModalSession)} className={styles["button-style"]}>
						Add session
					</button>
				)}

				{/* only for UNREGISTERED user */}
				{role === "None" && (
					<button onClick={() => setRendModalRegister(!rendModalRegister)} className={styles["button-style"]}>
						Register
					</button>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default ConferencePage;
