import fs from "fs";
import postcss from "postcss";
import postcssNested from "postcss-nested";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import replaceContent from "../../replace-content.js";

/**
 * Handles CSS files processing
 *
 * @param {String} file The absolute path of the file to be processed
 * @param {String} fileName The fileName of the file to be replaced in source file
 */
async function handleCssFile(data, file, fileName, fileExt) {
	const response = await getCssOutput(file);
	return replaceContent(data, fileName, fileExt, response);
}

/**
 * Process a CSS file with PostCSS
 *
 * @param {String} filePath
 */
function getCssOutput(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, css) => {
			postcss([postcssNested, autoprefixer, cssnano])
				.process(css, { from: undefined })
				.then((result) => {
					resolve(result.css);
				});
		});
	});
}

export { handleCssFile };
