import styles from "./ConferencePage.module.css";
import Footer from "./Footer";
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
					<div className={styles["topics-see-more"]}>
						<div className={styles["topics"]}>
							<div className={styles["topic"]}>Topic 1</div>
							<div className={styles["topic"]}>Topic 1</div>
							<div className={styles["topic"]}>Topic 1</div>
						</div>
						<button className={styles["button-style"]}>See Papers</button>
					</div>
					<div className={styles["conference-url"]}>
						<b>URL:</b>
						www.someurl.com
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
					<div className={styles["session-card"]}>
						<p><b>Session 1</b></p>
						<p>Description of Session 1</p>
					</div>
					<div className={styles["session-card"]}>
						<p><b>Session 2</b></p>
						<p>Description of Session 2</p>
					</div>
					<div className={styles["session-card"]}>
						<p><b>Session 3</b></p>
						<p>Description of Session 3</p>
					</div>
					<div className={styles["session-card"]}>
						<p><b>Session 4</b></p>
						<p>Description of Session 4</p>
					</div>
				</div>
			</div>

			<div className={styles["conference-chairs"]}>
				<h1>Chairs</h1>
				<div className={styles["chairs-list"]}>
					<div className={styles["chair"]}>
						<img src={`${process.env.PUBLIC_URL}/Img/profilePicture.png`}></img>
						Chair 1
					</div>
					<div className={styles["chair"]}>
						<img src={`${process.env.PUBLIC_URL}/Img/profilePicture.png`}></img>
						Chair 2
					</div>
					<div className={styles["chair"]}>
						<img src={`${process.env.PUBLIC_URL}/Img/profilePicture.png`}></img>
						Chair 3
					</div>
				</div>
			</div>
			
			{/* only for registered user 
				author - their own papers
				reviewer - papers to review
			*/}
			<div className={styles["focused-papers"]}>

			</div>

			{/* only for registered user 
				author - public papers (accepted papers)
				reviewer + chairs - all papers
			*/}
			<div className={styles["all-papers"]}>

			</div>

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
