import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

function onChangeFunc(newValue: string) {
	console.log("change", newValue);
}

function Editor(): React.ReactElement {
	return (
		<AceEditor
			placeholder="Add some code!"
			mode="javascript"
			theme="tomorrow"
			name="editor"
			width="100%"
			onChange={onChangeFunc}
			fontSize={16}
			showPrintMargin={false}
			showGutter={true}
			highlightActiveLine={true}
			setOptions={{
				enableBasicAutocompletion: false,
				enableLiveAutocompletion: true,
				enableSnippets: false,
				showLineNumbers: true,
				tabSize: 2,
			}}
		/>
	);
}

export default Editor;
