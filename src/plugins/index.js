import { handleCssFile } from "./css/index.js";
import { handleHtmlFile } from "./html/index.js";
import { handleJsFile } from "./js/index.js";
import { handleSvgFile } from "./svg/index.js";

const plugins = {
	css: handleCssFile,
	html: handleHtmlFile,
	js: handleJsFile,
	svg: handleSvgFile,
};

export default plugins;
