let thumbnailImages = [
    "./img/alaska-810433_1280_1.jpg",
    "./img/anime-8788959_1280_2.jpg",
    "./img/atmosphere-8752835_1280_3.jpg",
    "./img/blue-tit-8521052_1280.jpg",
    "./img/hurricane-92968_1280.jpg",
    "./img/lake-2896379_1280.jpg",
    "./img/moorente-8783210_1280.jpg",
    "./img/sea-2563389_1280.jpg",
    "./img/snow-bunting-6781122_1280.jpg",
    "./img/snow-leopard-cubs-8039138_1280.jpg",
    "./img/travel-8785493_1280.jpg",
    "./img/winter-1675197_1280.jpg",
];

let thumbnailImagesAlt = [
    "alaska-810433_1280_1",
    "anime-8788959_1280_2",
    "atmosphere-8752835_1280_3",
    "blue-tit-8521052_1280",
    "hurricane-92968_1280",
    "lake-2896379_1280",
    "moorente-8783210_1280",
    "sea-2563389_1280",
    "snow-bunting-6781122_1280",
    "snow-leopard-cubs-8039138_1280",
    "travel-8785493_1280",
    "winter-1675197_1280",
];

function render() {
    let thumbnailsRef = document.getElementById('thumbnails');
    for (let index = 0; index < thumbnailImages.length; index++) {
        thumbnailsRef.innerHTML += getNoteTemplate(index);
    }
};

function getNoteTemplate(index){
   return `<a href="${thumbnailImages[index]}"><img class="photo" src="${thumbnailImages[index]}" alt="${thumbnailImagesAlt[index]}"></a>`
};


 document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".gallery")
    .forEach(gallery => gallery.addEventListener("click", handleGalleryClick));
document.getElementById("gallery-fullview");

	function handleGalleryClick(event) {
		const clickedLink = event.target.closest("a");
		if (!clickedLink) return;
		event.preventDefault();
		showInFullview(clickedLink);
	}});

	function showInFullview(link) {
		const fullview = document.getElementById("gallery-fullview"),
			gallery = link.closest(".gallery"),
			thumb = link.querySelector("img"),
			caption = thumb ? thumb.alt : "";
			 
		link.parentElement.querySelectorAll("a[aria-selected]")
			.forEach(link => link.removeAttribute("aria-selected"));
		link.setAttribute("aria-selected", "true");
		fullview.querySelector("img")
			.src = link.href;
		fullview.querySelector("figcaption")
			.textContent = caption;
		fullview.dataset.gallery = gallery.id;
		fullview.showModal();
	}


	
	function closeDialog() {
	const fullview = document.getElementById("gallery-fullview");
	fullview.close();
}

function prevImage() {
	const fullview = document.getElementById("gallery-fullview");
	const gallery = document.getElementById(fullview.dataset.gallery);
	const currentThumb = gallery.querySelector("a[aria-selected]");
	nextThumb = navigateDOM(currentThumb, elem => elem.previousElementSibling,
	elem => elem.tagName == "A");
	if (!nextThumb) nextThumb = gallery.querySelector("a:last-of-type")
	showInFullview(nextThumb);
};	

function nextImage() {
	const fullview = document.getElementById("gallery-fullview");
	const gallery = document.getElementById(fullview.dataset.gallery);
	const currentThumb = gallery.querySelector("a[aria-selected]");
	showInFullview(navigateDOM(currentThumb, elem => elem.nextElementSibling,
				elem => elem.tagName == "A") || gallery.querySelector(
				"a:first-of-type"));
}

function navigateDOM(current, proceed, checkFound) {
				if (!current) return null;
				while (current = proceed(current)) {
					if (checkFound(current)) break;
				}
				return current;
			}