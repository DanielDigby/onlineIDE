import Docker from "dockerode";
import tar from "tar-fs";
import fs from "fs";
import path from "path";

import express = require("express");
import expressWs = require("express-ws");
import websocketStream = require("websocket-stream");
const { app } = expressWs(express());

const port = process.env.PORT || 8080;

// Used to parse JSON bodies, size limited
app.use(express.json({ limit: "300kb" }));

// Docker API setup
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// write and pack script+dockerfile into tar for docker API engine
function buildPack(language: string, script: string): tar.Pack {
	if (script.length === 0) {
		throw new Error("No script provided");
	}
	switch (language) {
		case "python":
			fs.writeFile("./langs/python/app.py", script, function (err) {
				if (err) throw new Error("Unable to write file");
			});

			return tar.pack(path.join(__dirname, "../langs/python"));
			break;
		default:
			throw new Error("Unsupported Language");
	}
}

// route handles POST new script, creates container
app.post("/create", async (req, res) => {
	console.log("begin " + req.body.language);
	try {
		// get user info
		const user = req.body.user;
		const imageName = user + "-image";
		const containerName = user + "-container";

		// pack for docker API build call
		const pack = buildPack(req.body.language, req.body.script);

		// promise stream while docker builds image
		const stream = await docker.buildImage(pack, {
			t: imageName,
		});

		// resolve promise stream
		await new Promise((resolve, reject) => {
			docker.modem.followProgress(stream, (err: unknown, res: unknown) =>
				err ? reject(err) : resolve(res)
			);
		});
		console.log("built image");
		docker.createContainer(
			{
				Image: imageName,
				name: containerName,
				AttachStdin: true,
				AttachStdout: true,
				AttachStderr: true,
				Tty: false,
				OpenStdin: true,
				StdinOnce: false,
				HostConfig: { AutoRemove: true },
			},
			function createCB(err, container) {
				res.status(200).send(container.id);
			}
		);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

// handle container start and websocket connection for container stdin, stdout, stderr
app.ws("/run/:containerId", function socket(ws, req) {
	try {
		const wsStream = websocketStream(ws);

		// on open attach to, and start container
		const container = docker.getContainer(req.params.containerId);
		let stdin: NodeJS.ReadWriteStream;
		ws.send("open " + container.id);

		container.attach(
			{
				stream: true,
				stdin: true,
				stdout: true,
				stderr: true,
			},
			function attachCB(err, stream) {
				// save stdin stream
				stdin = stream;

				// connect container stdout stderr to client
				stream.pipe(wsStream);

				container.start();
			}
		);

		// on message publish to container stdin
		ws.on("message", function messageCB(msg) {
			stdin.write(msg.toString());
		});
	} catch (err) {
		console.log(err);
		ws.send(err);
	}
});

app.get("/", (req, res) => {
	res.status(200).send("listening!");
});

app.listen(port, () => console.log(`Running on port ${port}`));

export const testExport = {
	buildPack: buildPack,
};
