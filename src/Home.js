import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";
import Image from "./home_background.jpg";
import styles from "./Home.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

class OneConference extends React.Component {
	render() {
		return (
			<div className={styles["oneConference"]}>
				<div className={styles["conferenceImage"]}>
					<img src={Image} />
				</div>
				<div className={styles["conferenceDetails"]}>
					<p>{this.props.conferenceTitle}</p>
					<div className={styles["topics"]}>
						<p>{this.props.topic1}</p>
						<p>{this.props.topic2}</p>
						<p>{this.props.topic3}</p>
					</div>
					<br></br>
					<h5>Description</h5>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et eros pretium, accumsan arcu non, fermentum ligula. Maecenas volutpat,
						ligula et tristique congue, dolor enim rhoncus nulla, vitae finibus eros lacus non erat. gravida vehicula nibh, eget aliquet erat
						ullamcorper sed.{" "}
					</p>
				</div>
				<div className={styles["conferenceMore"]}>
					<p>{this.props.conferenceDate}</p>
					<p>{this.props.conferenceLocation}</p>
					<a href="">
						<button type="button" id={styles["seeMoreHome"]}>
							See More
						</button>
					</a>
				</div>
			</div>
		);
	}
}

const Home = () => {

	const [conferences, setConferences] = useState([]);
	const [readData, setReadData] = useState(false);


	useEffect(() => {
		if (!readData){
			setReadData(true);
			fetch(process.env.REACT_APP_API_LINK + "conferences/", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			}).then((Response) => {
				if (Response.status == 200){
					Response.json().then((data) => {
						console.log("DATA - ");
						console.log(data);
						setConferences(data);
						console.log("CONFERENCES - ");
						console.log(conferences);
					})
				}
			});
		}
	}, [readData])



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
				<OneConference
					conferenceTitle="THE CONFERENCE"
					topic1="THE TOPIC"
					topic2="ANOTHER TOPIC"
					topic3="WELL HELLO THERE"
					conferenceDate="Date: 20.04.2022"
					conferenceLocation="Location: Romania, Cluj Napoca"
				/>

				<OneConference
					conferenceTitle="THE CONFERENCE, PT. 2"
					topic1="Topic 1"
					topic2="Topic 2"
					topic3="topic 3"
					conferenceDate="Date: 22.04.2022"
					conferenceLocation="Location: Romania, Brasov"
				/>

				<OneConference
					conferenceTitle="Melon Musk Ted Talk"
					topic1="Tesluh"
					topic2="Space Ex"
					topic3="Memecoins"
					conferenceDate="Date: 30.06.2420"
					conferenceLocation="Location: Mars, Mars"
				/>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
