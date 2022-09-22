import fs from 'fs'
import replaceContent from '../../replace-content.js'

/**
 * Handles JS files processing
 *
 * @param {String} file The absolute path of the file to be processed
 * @param {String} fileName The fileName of the file to be replaced in source file
 */
async function handleJsFile (data, file, fileName, fileExt) {
	const response = await getJsOutput(file)
	return replaceContent(data, fileName, fileExt, response)
}

/**
 * Minifies an Js file content
 *
 * @param {String} filePath
 */
function getJsOutput (filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				reject(err)
			}

			resolve(data)
		})
	})
}

export { handleJsFile }
