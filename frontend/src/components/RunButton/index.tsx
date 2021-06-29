import React from "react";
import { Button, Icon } from "semantic-ui-react";

function RunButton(): React.ReactElement {
	return (
		<div>
			<Button color="green" animated>
				<Button.Content visible>Run</Button.Content>
				<Button.Content hidden>
					<Icon name="play" />
				</Button.Content>
			</Button>
		</div>
	);
}

export default RunButton;
