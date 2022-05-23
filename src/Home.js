import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Image from "./home_background.jpg";
import styles from "./Home.module.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

class OneConference extends React.Component {
	render() {
		const confTopics = this.props.topics.map((topic) => {
			return <p>topic</p>
		});
		return (
			<div className={styles["oneConference"]}>
				<div className={styles["conferenceImage"]}>
					<img src={Image} />
				</div>
				<div className={styles["conferenceDetails"]}>
					<p>{this.props.conferenceTitle}</p>
					<div className={styles["topics"]}>
						{confTopics}
						{/* <p>{this.props.topic1}</p>
						<p>{this.props.topic2}</p>
						<p>{this.props.topic3}</p> */}
					</div>
					<br></br>
					<h5>Description</h5>
					<p>{this.props.description}</p>
				</div>
				<div className={styles["conferenceMore"]}>
					<p>{this.props.conferenceDate}</p>
					<p>{this.props.conferenceLocation}</p>
					<Link to={this.props.link}>
						<button type="button" id={styles["seeMoreHome"]}>
							See More
						</button>
					</Link>
				</div>
			</div>
		);
	}
}

function getConfTopics(confId){
	useEffect(() => {
		if (!readDataTopics){
			setReadDataTopics(true);
			fetch(process.env.REACT_APP_API_LINK + `conferences/${confId}/topics`, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			}).then((Response) => {
				if(Response.status == 200){
					Response.json().then((data) => {
						console.log(data);
						setconferenceTopics(data);
					})
				}
			})
		}
	}, [readDataTopics, confId]);

}

const Home = () => {
	const [conferences, setConferences] = useState([]);
	const [conferenceTopics, setconferenceTopics] = useState([]);
	const [readData, setReadData] = useState(false);
	const [readDataTopics, setReadDataTopics] = useState(false);


	useEffect(() => {
		if (!readData) {
			setReadData(true);
			fetch(process.env.REACT_APP_API_LINK + "conferences/", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((Response) => {
				if (Response.status == 200) {
					Response.json().then((data) => {
						setConferences(data);
					});
				}
			});
		}
	}, [readData]);

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
				{conferences.map(async (conference) => {
					
					// Get all topics for the current conference
					let confId = conference.conferenceid;
					let confTopics = getConfTopics(confId);
					// useEffect(() => {
					// 	if (!readDataTopics){
					// 		setReadDataTopics(true);
					// 		fetch(process.env.REACT_APP_API_LINK + `conferences/${confId}/topics`, {
					// 			method: "GET",
					// 			headers: { "Content-Type": "application/json" }
					// 		}).then((Response) => {
					// 			if(Response.status == 200){
					// 				Response.json().then((data) => {
					// 					console.log(data);
					// 					setconferenceTopics(data);
					// 				})
					// 			}
					// 		})
					// 	}
					// }, [readDataTopics, confId]);

					
					/// Create the conference
					return (
						<OneConference
							conferenceTitle={conference.name}
							topics = {conferenceTopics}
							description={conference.subtitles}
							conferenceDate="Date: 24.05.2022"
							conferenceLocation="Location: Romania, Cluj Napoca"
							link={`conferencepage/:${conference.conferenceid}`}
						/>
					);
				})}
			</div>
			<Footer />
		</div>
	);
};

export default Home;
