import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "./home_background.jpg";
import styles from "./Home.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OneConference = ({ conference }) => {
	const [topics, setTopics] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const navigate = useNavigate();

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
	}, []);

	const handleSeeMore = (e) => {
		e.preventDefault();
		navigate(`/conferencepage/:${conference.conferenceid}`);
	};

	if (isLoading) {
		return "Loading";
	}
	if (error) {
		return "Error";
	}
	return (
		<div className={styles["oneConference"]}>
			<div className={styles["conferenceImage"]}>
				<img src={Image} />
			</div>
			<div className={styles["conferenceDetails"]}>
				<p>{conference.name}</p>
				<div className={styles["topics"]}>
					{topics.map((topic) => (
						<p key={topic.conferencetopicid} className={styles["topic"]}>
							{topic.text}
						</p>
					))}
				</div>
				<br></br>
				<h5>Description</h5>
				<p>{conference.subtitles}</p>
			</div>
			<div className={styles["conferenceMore"]}>
				<p>{`Date: 20.04.2022`}</p>
				<p>{`Location: Romania, Cluj-Napoca`}</p>
				<button type="button" onClick={handleSeeMore} id={styles["seeMoreHome"]}>
					See More
				</button>
			</div>
		</div>
	);
};

const Home = () => {
	const [conferences, setConferences] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(process.env.REACT_APP_API_LINK + "conferences/", {
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
				setConferences(data);
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
		<div className={styles["mainPage"]}>
			<Navbar />
			<div className={styles["intro"]}>
				<h1>Conferences</h1>
				<button tpye="button" id={styles["introButtons"]}>
					Topics
				</button>
				<button tpye="button" id={styles["introButtons"]}>
					Locations
				</button>
			</div>
			<div className={styles["conferencesList"]} id={styles["conferences"]}>
				{conferences.map((conference) => {
					return <OneConference key={conference.conferenceid} conference={conference} />;
				})}
			</div>
			<Footer />
		</div>
	);
};

export default Home;
