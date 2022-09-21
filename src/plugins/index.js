import { handleJsFile } from "./js/index.js";
import { handleCssFile } from "./css/index.js";
import { handleHtmlFile } from "./html/index.js";

const plugins = {
	js: handleJsFile,
	css: handleCssFile,
	html: handleHtmlFile,
};

export default plugins;
