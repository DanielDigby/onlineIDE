import express from "express";
import Docker from "dockerode";

const app = express();
const port = process.env.PORT || 8080;

// Docker API setup
const docker = new Docker();

// Used to parse JSON bodies, size limited for security
app.use(express.json({ limit: "300kb" }));

app.get("/", async (_, res) => {
	console.log("hello");

	console.log(await docker.listContainers());

	// docker.createContainer(
	// 	{ Image: "ubuntu", Cmd: ["/bin/bash"], name: "ubuntu-test" },
	// 	function (err, container) {
	// 		try {
	// 			container.start(function (err, data) {
	// 				console.log(data);
	// 			});
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	}
	// );

	res.status(200).send();
});

app.post("/run", (req, res) => {
	const body = req.body;
	res.status(200).send(body);
});

app.listen(port, () => console.log(`Running on port ${port}`));
