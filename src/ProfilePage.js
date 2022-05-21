import Navbar from "./Navbar";
import styles from "./ProfilePage.module.css";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
	const { id } = useParams();
	console.log(id);
	return (
		<div className={styles["profile-page"]}>
			<Navbar />
			<div className={styles["profile-page-container"]}>
				<div className={styles["profile-container"]}>
					<div className={styles["profile-header"]}>
						<div className={styles["profile-picture"]}></div>
						<p>
							<span>First nameeeeeeeeeeeeeeeeee</span>
							<span>Last nameeeeeeeeeeeeeeeeeee</span>
						</p>
					</div>
					<div className={styles["profile-information"]}>
						<form className={styles["form-update-profile-information"]}>
							<div className={styles["label-input"]}>
								<label>Email: </label>
								<input type="email" name="email" required></input>
							</div>
							<div className={styles["label-input"]}>
								<label>First name: </label>
								<input type="text" required></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Last name: </label>
								<input type="text" required></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Title: </label>
								<input type="text"></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Gender: </label>
								<input type="text"></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Nationality: </label>
								<input type="text"></input>
							</div>
							<div className={styles["label-input"]}>
								<label>Address: </label>
								<input type="text"></input>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;
