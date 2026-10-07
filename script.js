// =========================
// SELECT ELEMENTS
// =========================

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const filterButtons = document.querySelectorAll(".filter-btn");


// =========================
// VARIABLES
// =========================

// Images currently visible after filtering
let visibleItems = [...galleryItems];

let currentIndex = 0;


// =========================
// OPEN LIGHTBOX
// =========================

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        // Find the clicked image inside visible items
        currentIndex = visibleItems.indexOf(item);

        showImage(currentIndex);

        lightbox.classList.add("active");

    });

});


// =========================
// SHOW IMAGE
// =========================

function showImage(index) {

    // If index goes beyond last image
    if (index >= visibleItems.length) {
        currentIndex = 0;
    }

    // If index goes before first image
    if (index < 0) {
        currentIndex = visibleItems.length - 1;
    }

    const item = visibleItems[currentIndex];

    const image = item.querySelector("img");
    const title = item.querySelector("h3");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title.textContent;
}


// =========================
// NEXT IMAGE
// =========================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    showImage(currentIndex);

});


// =========================
// PREVIOUS IMAGE
// =========================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    showImage(currentIndex);

});


// =========================
// CLOSE LIGHTBOX
// =========================

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


// =========================
// CLOSE BY CLICKING OUTSIDE
// =========================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


// =========================
// KEYBOARD CONTROLS
// =========================

document.addEventListener("keydown", (event) => {

    // Only work when lightbox is open
    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "ArrowRight") {

        currentIndex++;

        showImage(currentIndex);

    }

    if (event.key === "ArrowLeft") {

        currentIndex--;

        showImage(currentIndex);

    }

    if (event.key === "Escape") {

        lightbox.classList.remove("active");

    }

});


// =========================
// CATEGORY FILTER
// =========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;


        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Filter visible images
        visibleItems = [...galleryItems].filter(item => {

            const itemCategory = item.dataset.category;

            return (
                category === "all" ||
                category === itemCategory
            );

        });


        // Show / hide images
        galleryItems.forEach(item => {

            if (visibleItems.includes(item)) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });


        // Reset lightbox position
        currentIndex = 0;

    });

});

