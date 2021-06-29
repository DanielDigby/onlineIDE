import React from "react";

import styles from "./codeView.module.css";

import Editor from "../../components/Editor";
import RunButton from "../../components/RunButton";

class CodeView extends React.Component {
	render(): React.ReactElement {
		return (
			<div>
				<div className={styles.header}>
					<RunButton />
				</div>
				<div className={styles.main}>
					<div className={styles.files}>Files</div>
					<div className={styles.editor}>
						<Editor />
					</div>
					<div className={styles.output}>Output</div>
				</div>
			</div>
		);
	}
}
export default CodeView;
