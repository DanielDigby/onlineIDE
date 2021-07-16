import React, { useRef, useEffect, useState } from "react";

import styles from "./codeView.module.css";
import Editor from "../../components/Editor";
import RunButton from "../../components/RunButton";
import { XTerm } from "xterm-for-react";
import Xterm from "xterm-for-react/dist/src/XTerm";

const CodeView = (): JSX.Element => {
	const xtermRef = useRef<Xterm>(null);
	const [input, setInput] = useState("");

	useEffect(() => {
		// Once the terminal is loaded write a new line to it.
		xtermRef?.current?.terminal.writeln(
			"Please enter any string then press enter:"
		);
		xtermRef?.current?.terminal.writeln("echo> ");
	}, []);

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
				<div className={styles.output}>
					{/* Create a new terminal and set it's ref. */}
					<XTerm
						ref={xtermRef}
						onData={(data) => {
							const code = data.charCodeAt(0);
							// If the user hits empty and there is something typed echo it.
							if (code === 13 && input.length > 0) {
								xtermRef?.current?.terminal.write(
									"\r\nYou typed: '" + input + "'\r\n"
								);
								xtermRef?.current?.terminal.write("echo> ");
								setInput("");
								// } else if (code < 32 || code === 127) {
								// 	// Disable control Keys such as arrow keys
								// 	return;
							} else {
								// Add general key press characters to the terminal
								xtermRef?.current?.terminal.write(data);
								setInput(input + data);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default CodeView;
