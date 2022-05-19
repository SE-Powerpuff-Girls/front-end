import React from "react";
import { Link } from "react-router-dom";
import styles from "./ConferencePapers.module.css";
import Navbar from "./Navbar";

const OnePaper = ({
	topics = ["Default", "Topics"],
	title = "Default title",
	authors = ["Default", "Authors"],
	content = "Some default content",
}) => {
	return (
		<div className={styles["one-paper"]}>
			<div className={styles["paper-header"]}>
				<div className={styles["paper-details"]}>
					<h2>{title}</h2>
					<div className={styles["topics"]}>
						{topics.map((topic) => (
							<div className={styles["topic"]}>{topic}</div>
						))}
					</div>
				</div>
				<div className={styles["paper-authors"]}>
					<span>Authors: </span>
					<ul>
						{authors.map((author) => (
							<li>{author}</li>
						))}
					</ul>
				</div>
			</div>
			<div className={styles["paper-content"]}>
				<h3>Abstract</h3>
				<p>{content}</p>
			</div>
			<button className={styles["see-more-button"]}>See more</button>
		</div>
	);
};

const conferencePapers = ({
	title = "Default title",
	location = "Default location",
	date = "Default date",
	topics = ["Default", "Topics"],
	url = "https://www.tomorrowtides.com/conference-name.html",
}) => {
	return (
		<div className={styles["conference-papers-page"]}>
			<Navbar></Navbar>
			<div className={styles["conference-papers-thumbnail"]}></div>
			<div className={styles["conference-details"]}>
				<div className={styles["conference-thumbnail"]}></div>
				<div className={styles["conference-information"]}>
					<div className={styles["conference-identifiers"]}>
						<span className={styles["conference-title"]}>{title}</span>
						<span className={styles["conference-location"]}>{location}</span>
						<span className={styles["conference-date"]}>{date}</span>
					</div>
					<div className={styles["topics"]}>
						{topics.map((topic) => (
							<div className={styles["topic"]}>{topic}</div>
						))}
					</div>
					<div className={styles["conference-url"]}>
						<b>URL:</b>
						{url}
					</div>
				</div>
			</div>
			<div className={styles["conference-papers"]}>
				<h3>Papers</h3>
				<div className={styles["available-papers"]}>
					<OnePaper></OnePaper>
					<OnePaper></OnePaper>
					<OnePaper></OnePaper>
					<OnePaper></OnePaper>
				</div>
			</div>
		</div>
	);
};

export default conferencePapers;
