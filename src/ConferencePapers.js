import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

class OnePaper extends React.Component {
	render() {
		return (
			<div className="one-paper">
				<div className="paper-header">
					<div className="paper-details">
						<h2>Paper Title</h2>
						<div className="topics">
							<div className="topic">Topic 1</div>
							<div className="topic">Topic 2</div>
							<div className="topic">Topic 3</div>
						</div>
					</div>
					<div className="paper-authors">
						<span>Authors: </span>
						<ul>
							<li>Author 1</li>
							<li>Author 2</li>
							<li>Author 3</li>
						</ul>
					</div>
				</div>
				<div className="paper-content">
					<h3>Abstract</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus, quam ac porttitor efficitur, nisl eros finibus nisi, id fringilla
						neque metus a mi. Morbi pulvinar risus felis, tempor viverra mi sagittis ut. Duis libero quam, cursus vel efficitur dictum, luctus vitae
						mi. Suspendisse condimentum, nisl ornare eleifend euismod, lectus magna semper nisi, non posuere leo enim a leo. Cras finibus felis
						tristique, euismod augue non, tincidunt ipsum. Donec fermentum scelerisque condimentum. Maecenas eu sem est.
					</p>
					<button>See more</button>
				</div>
			</div>
		);
	}
}

const conferencePapers = () => {
	return (
		<div className="conference-papers-page">
			<Navbar></Navbar>
			<div className="conference-papers-thumbnail"></div>
			<div className="conference-details">
				<div className="conference-thumbnail"></div>
				<div className="conference-information">
					<div className="conference-identifiers">
						<span className="conference-title">Conference Title</span>
						<span className="conference-location">Location: Romania, Cluj-Napoca, str. Eroilor, nr 102</span>
						<span className="conference-date">Date: 22.05.2024</span>
					</div>
					<div className="topics">
						<div className="topic">Topic 1</div>
						<div className="topic">Topic 2</div>
						<div className="topic">Topic 3</div>
					</div>
					<div className="conference-url">
						<b>URL</b>: https://www.tomorrowtides.com/conference-name.html
					</div>
				</div>
			</div>
			<div className="conference-papers">
				<h3>Papers</h3>
				<div className="available-papers">
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
