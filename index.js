import fs from 'fs'
import path from 'path'
import babel from '@babel/core'
import UglifyJS from 'uglify-js'
import yargs from 'yargs'
import chalk from 'chalk'
import chokidar from 'chokidar'
import plugins from './src/plugins/index.js'

import patch from 'log-timestamp'
patch(() => {
	return '[' + new Date().toLocaleString() + ']'
})

const argv = yargs(process.argv.slice(2)).argv

// If no argument is passed, the dir is missing so we throw an error
if (!argv.dir || argv.dir === true) {
	console.error(chalk.red('Path is missing. Please specify a path.'))
	process.exit(1)
}

// Get working directory from console parameter
const workingDirectory = argv.dir

// Sets the different paths needed to work
const pathToSrcFiles = path.resolve(workingDirectory, 'src')
const pathToSource = path.resolve(workingDirectory)
const pathToDist = path.resolve(workingDirectory, 'dist')

// If the build parameter is used, then no watch is required
if (argv.build) {
	computeDistFile()
} else {
// If the build parameter is not setted
	console.log(chalk.cyan(`Watching for file changes on ${pathToSource}`))
	const watcher = chokidar.watch(pathToSource, {
		ignored: /\/dist\/.*/,
		persistent: true
	})

	watcher
		.on('add', function (path) {
			console.log(
				chalk.yellow(
					'File',
					path.replace(pathToSource, ''),
					'has been added'
				)
			)
			computeDistFile()
		})
		.on('change', function (path) {
			console.log(
				chalk.yellow(
					'File',
					path.replace(pathToSource, ''),
					'has been changed'
				)
			)
			computeDistFile()
		})
		.on('unlink', function (path) {
			console.log(
				chalk.yellow(
					'File',
					path.replace(pathToSource, ''),
					'has been removed'
				)
			)
			computeDistFile()
		})
		.on('error', function (error) {
			console.error(chalk.red('Error happened', error))
		})
}

/**
* This method writes the computed file to the dist folder
* It matches css and html files and handles them
*/
function computeDistFile () {
	fs.readdir(pathToSource, (err, files) => {
		if (err) throw err

		// Iterates over each file in workingDirectory
		files.forEach((file) => {
			const sourceFile = path.resolve(pathToSource, file)

			// If it is a directory, go to the next file
			if (fs.lstatSync(sourceFile).isDirectory()) return

			const sourceFileName = path.basename(
				sourceFile,
				path.extname(sourceFile)
			)
			const sourceFileExt = path.extname(sourceFile).replace('.', '')
			const distFile = path.resolve(
				pathToDist,
				sourceFileName + '.' + sourceFileExt
			)

			// Gets the source file content
			fs.readFile(sourceFile, 'utf8', async (err, sourceData) => {
				if (err) throw err

				// Gets all files within the pathToSrcFiles ie. workingDir/src
				const files = getAllFilesFromDirectory(pathToSrcFiles)

				// Initiate the computedData with the original content
				let computedData = sourceData

				// Use for loop for synchronous version
				// Iterates over all files to process
				for (let index = 0; index < files.length; index++) {
					const file = files[index]

					const fileName = path.basename(file, path.extname(file))
					const fileExt = path.extname(file).replace('.', '')

					computedData = await plugins[fileExt](
						computedData,
						file,
						fileName,
						fileExt
					)
				}

				// When all processing is done
				// The dist file content is babelified
				babel.transform(computedData, (err, result) => {
					if (err) throw err
					// The dist file is written to disk
					if (argv.debug) {
						/**
						* No minifier
						*/
						fs.writeFile(distFile, result.code, 'utf8', function (err) {
							if (err) throw err
						})
					} else {
						/**
						* With minifier
						*/
						fs.writeFile(
							distFile,
							UglifyJS.minify(result.code).code,
							'utf8',
							function (err) {
								if (err) throw err
							}
						)
					}

					console.log(
						chalk.green(
							'File',
							distFile.replace(pathToSource, ''),
							'has been generated'
						)
					)
				})
			})
		})
	})
}

/**
* Gets all files within directory
*
* @param {String} dirPath
* @param {Array} arrayOfFiles
*
* @return {Array} an array of found files
*/
const getAllFilesFromDirectory = function (dirPath, arrayOfFiles) {
	const files = fs.readdirSync(dirPath)

	arrayOfFiles = arrayOfFiles || []

	files.forEach(function (file) {
		if (fs.statSync(path.resolve(dirPath, file)).isDirectory()) {
			arrayOfFiles = getAllFilesFromDirectory(
				path.resolve(dirPath, file),
				arrayOfFiles
			)
		} else {
			arrayOfFiles.push(path.join(dirPath, '/', file))
		}
	})

	return arrayOfFiles
}
