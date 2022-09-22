// Gets the minified template
let template = `{{html/test}}`;

// Gets processed CSS
const css = `{{css/main}}`;

// Gets svg
const svg = `{{svg/circle}}`;

// Import JS
{{js/test}}
test()

// Replace content in template
template = template.replace("{{circle}}", svg);

// Insert said template in the DOM
document.querySelector("body").insertAdjacentHTML("beforeend", template);

// Inject CSS in DOM
const styleTag = document.createElement("style");
styleTag.id = "test_style";
styleTag.innerHTML = css;
document.querySelector("head").insertAdjacentElement("beforeend", styleTag);
