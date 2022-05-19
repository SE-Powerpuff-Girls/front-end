import Navbar from "./Navbar";
import styles from "./ReviewPage.module.css";

const ReviewPage = ({ paperTitle = "Default paper title", comments = ["There", "would", "be", "some", "comments"] }) => {
	return (
		<div className={styles["review-page"]}>
			<Navbar></Navbar>
			<div className={styles["conference-papers-thumbnail"]}></div>
			<div className={styles["review-page-content"]}>
				<div className={styles["paper-information"]}>
					<div className={styles["paper-title"]}>
						<span>{paperTitle}</span>
						<img src={`${process.env.PUBLIC_URL}/Img/flag-solid.svg`} alt="flag"></img>
					</div>
					<section className={styles["paper-content"]}></section>
				</div>
				<div className={styles["evaluate-paper"]}>
					<div className={styles["review-paper"]}>
						<span id={styles["review-this-paper"]}>Review this paper</span>
						<span>Add to evaluation/ public Comment</span>
						<div>
							<ul>
								{comments.map((comment) => (
									<li>{comment}</li>
								))}
							</ul>
						</div>
						<form>
							<textarea type="text" required placeholder="Enter your comment..."></textarea>
							<button>Add comment</button>
						</form>
					</div>
					<div className={styles["finish-evaluation"]}>
						<span>Finish Evaluation</span>
						<button>Send all X comments</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewPage;
