/* eslint-disable security/detect-non-literal-fs-filename */
import { expect } from "chai";
import tar from "tar-fs";
import fs from "fs";
import { testExport } from "../src/index";

// Test suite
describe("build pack from script and dockerfile", function () {
	const buildPack = testExport.buildPack;
	// Test spec (unit test)
	it("should correctly pack dockerfile + script", async function () {
		const language = "python";
		const script = "print('hello')";

		buildPack(language, script)
			.pipe(tar.extract("./test/temp/" + language))
			.on("end", function () {
				fs.readdir("./test/temp/" + language, function (err, files) {
					expect(files).to.include.members(["app.py", "dockerfile"]);
				});
			});
	});

	it("should return an error if language is not supported", function () {
		const language = "";
		const script = "print('hello')";

		expect(() => buildPack(language, script)).to.throw(
			Error,
			"Unsupported Language"
		);
	});

	it("should return an error if no script is provided", function () {
		const language = "python";
		const script = "";

		expect(() => buildPack(language, script)).to.throw(
			Error,
			"No script provided"
		);
	});

	it("should return an error if unable to write file", function () {
		const language = "python";
		const script = "print('hello')";

		expect(() => buildPack(language, script)).to.throw(
			Error,
			"Unable to write file"
		);
	});

	it("should pack the correct language", async function () {
		// python
		const language = "python";
		const script = "examplescript";

		buildPack(language, script)
			.pipe(tar.extract("./test/temp/" + language))
			.on("end", function () {
				fs.readdir("./test/temp/" + language, function (err, files) {
					expect(files).to.include.members(["app.py", "dockerfile"]);
				});
			});

		// Java
		const language2 = "java";
		const script2 = "examplescript";

		buildPack(language2, script2)
			.pipe(tar.extract("./test/temp/" + language2))
			.on("end", function () {
				fs.readdir("./test/temp/" + language2, function (err, files) {
					expect(files).to.include.members([
						"Main.java",
						"dockerfile",
					]);
				});
			});

		// C
		const language3 = "c";
		const script3 = "examplescript";

		buildPack(language3, script3)
			.pipe(tar.extract("./test/temp/" + language3))
			.on("end", function () {
				fs.readdir("./test/temp/" + language3, function (err, files) {
					expect(files).to.include.members(["main.c", "dockerfile"]);
				});
			});
	});

	it("should not conflict when packing languages for different users ", function () {
		expect(() => false).to.be.true;
	});
});
