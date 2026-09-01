/* =========================================
   WANDERGALLERY - DAY 09
   JAVASCRIPT FUNCTIONALITY
========================================= */


// ---------- ELEMENTS ----------

const galleryCards =
    document.querySelectorAll(".gallery-card");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const previewImage =
    document.getElementById("previewImage");

const previewTitle =
    document.getElementById("previewTitle");

const previewCategory =
    document.getElementById("previewCategory");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const currentNumber =
    document.getElementById("currentNumber");

const totalNumber =
    document.getElementById("totalNumber");

const imageCount =
    document.getElementById("imageCount");


// ---------- STATE ----------

let currentIndex = 0;

let visibleCards = [...galleryCards];


// ---------- UPDATE IMAGE COUNT ----------

function updateImageCount() {

    imageCount.textContent =
        visibleCards.length;

}


// ---------- FILTER GALLERY ----------

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter =
            button.dataset.filter;


        // Update active button

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // Filter cards

        visibleCards = [];


        galleryCards.forEach(card => {

            const category =
                card.dataset.category;


            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {

                card.classList.remove("hidden");

                visibleCards.push(card);

            } else {

                card.classList.add("hidden");

            }

        });


        updateImageCount();

    });

});


// ---------- OPEN LIGHTBOX ----------

function openLightbox(card) {

    currentIndex =
        visibleCards.indexOf(card);


    if (currentIndex === -1) {

        currentIndex = 0;

    }


    updateLightbox();


    lightbox.classList.add("active");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


// ---------- UPDATE LIGHTBOX ----------

function updateLightbox() {

    const card =
        visibleCards[currentIndex];


    if (!card) return;


    const image =
        card.querySelector("img");


    previewImage.src =
        image.src;

    previewImage.alt =
        image.alt;


    previewTitle.textContent =
        card.dataset.title;


    previewCategory.textContent =
        card.dataset.category;


    currentNumber.textContent =
        currentIndex + 1;


    totalNumber.textContent =
        visibleCards.length;

}


// ---------- CLOSE LIGHTBOX ----------

function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


// ---------- NEXT IMAGE ----------

function nextImage() {

    if (visibleCards.length === 0) return;


    currentIndex++;


    if (
        currentIndex >=
        visibleCards.length
    ) {

        currentIndex = 0;

    }


    updateLightbox();

}


// ---------- PREVIOUS IMAGE ----------

function previousImage() {

    if (visibleCards.length === 0) return;


    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            visibleCards.length - 1;

    }


    updateLightbox();

}


// ---------- CARD CLICK ----------

galleryCards.forEach(card => {

    card.addEventListener("click", () => {

        if (
            !card.classList.contains("hidden")
        ) {

            openLightbox(card);

        }

    });

});


// ---------- BUTTON EVENTS ----------

closeBtn.addEventListener(
    "click",
    closeLightbox
);


nextBtn.addEventListener(
    "click",
    nextImage
);


prevBtn.addEventListener(
    "click",
    previousImage
);


// ---------- BACKGROUND CLICK ----------

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


// ---------- KEYBOARD CONTROLS ----------

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        switch (event.key) {

            case "Escape":

                closeLightbox();

                break;


            case "ArrowRight":

                nextImage();

                break;


            case "ArrowLeft":

                previousImage();

                break;

        }

    }
);


// ---------- INITIAL COUNT ----------

updateImageCount();