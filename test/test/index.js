// Gets the modal minified template
const modalTemplate = `{{html/modal}}`;
// Insert said template in the DOM
document
	.querySelector(".page.bouquet")
	.insertAdjacentHTML("beforeend", modalTemplate);
// Get reference of the modal node
const modal = document.querySelector(".AB_modal");
// Gets processed CSS
const css = `{{css/main}}`;
// Inject CSS in DOM
const styleTag = document.createElement("style");
styleTag.id = "AB_style";
styleTag.innerHTML = css;
document.querySelector("head").insertAdjacentElement("beforeend", styleTag);

// Adds listener to close modal button
modal.querySelector(".AB_modal-close").addEventListener("click", function (e) {
	e.preventDefault();
	modal.classList.remove("active");
});

// Opens modal after 1.5 seconds
setTimeout(function () {
	modal.classList.add("active");
}, 1500);
