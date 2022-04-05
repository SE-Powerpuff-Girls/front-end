// function oneConference(){
// 	return(
// 		<div className="oneConference">
// 			<div className="conferenceImage">
// 				<p>Here comes a conference image</p>
// 			</div>
// 			<div className="conferenceDetails">
// 				<p>Conference 1 Title</p>
// 				<p>Location: Romania, Cluj Napoca</p>
// 				<p>Date: 20.04.2022</p>
// 				<div className = "topics">
// 					<p>Topic 1</p>
// 					<p>Topic 2</p>
// 					<p>Topic 3</p>
// 				</div>
// 				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 					Nunc et eros pretium, accumsan arcu non, fermentum ligula.
// 					Maecenas volutpat, ligula et tristique congue, dolor enim
// 					rhoncus nulla, vitae finibus eros lacus non erat.
// 					gravida vehicula nibh, eget aliquet erat ullamcorper sed. </p>
// 				<button id="seeMore">See More</button>
// 			</div>
// 		</div>
// 	)
//
// }

const Home = () => {

	return(
		<div className="mainPage">
			<div className="mainImage">
				<p>Here comes the home image</p>
			</div>
			{/*<p>Conferences</p>*/}
			<div className="conferencesList">
				<div className="oneConference">
					<div className="conferenceImage">
						<p>Here comes a conference image</p>
					</div>
					<div className="conferenceDetails">
					<p>Conference 1 Title</p>
					<p>Location: Romania, Cluj Napoca</p>
					<p>Date: 20.04.2022</p>
					<div className = "topics">
						<p>Topic 1</p>
						<p>Topic 2</p>
						<p>Topic 3</p>
					</div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Nunc et eros pretium, accumsan arcu non, fermentum ligula.
						Maecenas volutpat, ligula et tristique congue, dolor enim
						rhoncus nulla, vitae finibus eros lacus non erat.
						gravida vehicula nibh, eget aliquet erat ullamcorper sed. </p>
						<button id="seeMore">See More</button>
					</div>
				</div>
				<div className="oneConference">
					<div className="conferenceImage">
						<p>Here comes a conference image</p>
					</div>
					<div className="conferenceDetails">
						<p>Conference 2 Title</p>
						<p>Location: Romania, Cluj Napoca</p>
						<p>Date: 20.04.2022</p>
						<div className = "topics">
							<p>Topic 1</p>
							<p>Topic 2</p>
							<p>Topic 3</p>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Nunc et eros pretium, accumsan arcu non, fermentum ligula.
							Maecenas volutpat, ligula et tristique congue, dolor enim
							rhoncus nulla, vitae finibus eros lacus non erat.
							gravida vehicula nibh, eget aliquet erat ullamcorper sed. </p>
						<button id="seeMore">See More</button>
					</div>
				</div>
				<div className="oneConference">
					<div className="conferenceImage">
						<p>Here comes a conference image</p>
					</div>
					<div className="conferenceDetails">
						<p>Conference 3 Title</p>
						<p>Location: Romania, Cluj Napoca</p>
						<p>Date: 20.04.2022</p>
						<div className = "topics">
							<p>Topic 1</p>
							<p>Topic 2</p>
							<p>Topic 3</p>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Nunc et eros pretium, accumsan arcu non, fermentum ligula.
							Maecenas volutpat, ligula et tristique congue, dolor enim
							rhoncus nulla, vitae finibus eros lacus non erat.
							gravida vehicula nibh, eget aliquet erat ullamcorper sed. </p>
						<button id="seeMore">See More</button>
					</div>
				</div>
			</div>

		</div>
	)
};

export default Home;
