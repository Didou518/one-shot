import fs from "fs";
import { minify } from "html-minifier";
import replaceContent from "../../replace-content.js";

/**
 * Handles HTML files processing
 *
 * @param {String} file The absolute path of the file to be processed
 * @param {String} fileName The fileName of the file to be replaced in source file
 */
async function handleHtmlFile(data, file, fileName, fileExt) {
	const response = await getHtmlOutput(file);
	return replaceContent(data, fileName, fileExt, response);
}

/**
 * Minifies an HTML file content
 *
 * @param {String} filePath
 */
function getHtmlOutput(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, html) => {
			resolve(
				minify(html, {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true,
				})
			);
		});
	});
}

export { handleHtmlFile };
