import styles from "./ConferencePage.module.css";
import Navbar from "./Navbar";

const ConferencePage = () => {
	return (
		<div className={styles["conference-page"]}>
			<Navbar></Navbar>
			<div className={styles["main-image"]}></div>
			<div className={styles["conference-details"]}>
				<div className={styles["conference-image"]}></div>
				<div className={styles["conference-information"]}>
					<div className={styles["conference-identifiers"]}>
						<span className={styles["conference-title"]}>Conference Title</span>
						<span className={styles["conference-location"]}>Conference Location</span>
						<span className={styles["conference-date"]}>Date: 22.05.2024</span>
					</div>
					<div className={styles["topics"]}>
						<div className={styles["topic"]}>Topic 1</div>
						<div className={styles["topic"]}>Topic 1</div>
						<div className={styles["topic"]}>Topic 1</div>
					</div>
					<div className={styles["conference-url"]}>
						<b>URL:</b>
						www.someurl.com
					</div>
				</div>

				<button className={styles["seePapersButton"]}>See Papers</button>
			</div>
			<div className={styles["conference-presentation"]}>
				<h1>Presentation</h1>
				<p>
					Organic growth create spaces to explore what's next. Lean into that problem player-coach but we need to get the vernacular right turd
					polishing, but run it up the flagpole, ping the boss and circle back nor feed the algorithm. The closest elephant is the most dangerous this
					proposal is a win-win situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables close the loop
					note for the previous submit: the devil should be on the left shoulder out of the loop. Rehydrate the team i've been doing some research
					this morning and we need to better nor optimize the fireball. Increase the resolution, scale it up we need a larger print.{" "}
				</p>
			</div>
			<div className={styles["conference-organizers"]}>
				<h2>Organizers</h2>
				<div className={styles["organizers-list"]}>
					<div className={styles["organizer"]}>Organiser 1</div>
					<div className={styles["organizer"]}>Organiser 2</div>
					<div className={styles["organizer"]}>Organiser 3</div>
					<div className={styles["organizer"]}>Organiser 4</div>
				</div>
			</div>
		</div>
	);
};

export default ConferencePage;
