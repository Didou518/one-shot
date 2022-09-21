import fs from "fs";
import { optimize } from "svgo";
import replaceContent from "../../replace-content.js";

/**
 * Handles SVG files processing
 *
 * @param {String} file The absolute path of the file to be processed
 * @param {String} fileName The fileName of the file to be replaced in source file
 */
async function handleSvgFile(data, file, fileName, fileExt) {
	const response = await getSvgOutput(file);
	return replaceContent(data, fileName, fileExt, response);
}

/**
 * Minifies an HTML file content
 *
 * @param {String} filePath
 */
function getSvgOutput(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, svg) => {
			const result = optimize(svg, {
				path: filePath,
			});
			resolve(result.data);
		});
	});
}

export { handleSvgFile };
