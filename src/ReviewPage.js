import Navbar from "./Navbar";

const ReviewPage = () => {
	return (
		<div className="review-page">
			<Navbar></Navbar>
			<div className="conference-papers-thumbnail"></div>
			<div className="review-page-content">
				<div className="paper-information">
					<div className="paper-title">
						<span>Paper's Title</span>
						<img src={`${process.env.PUBLIC_URL}/Img/flag-solid.svg`} alt="flag"></img>
					</div>
					<section className="paper-content"></section>
				</div>
				<div className="evaluate-paper">
					<div className="review-paper">
						<span id="review-this-paper">Review this paper</span>
						<span>Add to evaluation/ public Comment</span>
						<div>
							<ul>
								<li>Comment 1</li>
								<li>Comment 2</li>
								<li>Comment 3</li>
								<li>Comment 4</li>
								<li>Comment 5</li>
								<li>Comment 5</li>
								<li>Comment 5</li>
								<li>Comment 5</li>
								<li>Comment 5</li>
								<li>Comment 5</li>
							</ul>
						</div>
						<form>
							<textarea type="text" required placeholder="Enter your comment..."></textarea>
							<button>Add comment</button>
						</form>
					</div>
					<div className="finish-evaluation">
						<span>Finish Evaluation</span>
						<button>Send all X comments</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewPage;
