// PAGE NAVIGATION

const pages = document.querySelectorAll(".page");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");
const restartBtn = document.getElementById("restart");

let currentPage = 0;

pages.forEach((page, index) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("aria-label", "Open page " + (index + 1));

    dot.addEventListener("click", () => {
        showPage(index);
    });

    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll(".dot");

function showPage(index) {
    if (index < 0 || index >= pages.length) return;

    pages.forEach((page) => page.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    pages[index].classList.add("active");
    dots[index].classList.add("active");

    currentPage = index;

    backBtn.disabled = index === 0;
    nextBtn.disabled = index === pages.length - 1;

    if (index === pages.length - 1) {
        nextBtn.textContent = "Done 🎉";
    } else {
        nextBtn.textContent = "Aage →";
    }
}

function nextPage() {
    showPage(currentPage + 1);
}

function prevPage() {
    showPage(currentPage - 1);
}

nextBtn.addEventListener("click", nextPage);
backBtn.addEventListener("click", prevPage);

document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
        nextPage();
    });
});

restartBtn.addEventListener("click", () => {
    showPage(0);
});

// SINGLE PHOTO ON CLICK WITH FLIP / SPIN EFFECT

const memoryButtons = document.querySelectorAll(".memory-btn");
const activePhoto = document.getElementById("activePhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");
const photoCaption = document.getElementById("photoCaption");
const animClasses = ["anim-flipY", "anim-flipX", "anim-spinZoom", "anim-swingIn"];

memoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        memoryButtons.forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");

        const src = btn.getAttribute("data-photo");
        const label = btn.getAttribute("data-label") || "Pic";
        const note = btn.getAttribute("data-note") || "";
        const animName = btn.getAttribute("data-anim") || "flipY";

        activePhoto.hidden = false;
        photoPlaceholder.hidden = true;
        activePhoto.src = src;
        activePhoto.alt = label;
        photoCaption.textContent = note;

        // Reset previous animation class so clicking the same or another button replays cleanly
        activePhoto.classList.remove(...animClasses);
        void activePhoto.offsetWidth;
        activePhoto.classList.add("anim-" + animName);
    });
});

// MUSIC

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.35;

musicBtn.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicBtn.textContent = "♫ Vibe On";
        } catch {
            musicBtn.textContent = "♫ Try Again";
        }
    } else {
        music.pause();
        musicBtn.textContent = "♫ Vibe Off";
    }
});

document.querySelector("[data-next]").addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicBtn.textContent = "♫ Vibe On";
        } catch {
            musicBtn.textContent = "♫ Vibe On";
        }
    }
});

// CLICK SPARKLES

function makeSpark(x, y) {
    const spark = document.createElement("span");
    const symbols = ["🎉", "✨", "💛", "🎈"];

    spark.className = "spark";
    spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    spark.style.left = x + "px";
    spark.style.top = y + "px";

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 700);
}

document.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
        for (let i = 0; i < 3; i++) {
            makeSpark(
                event.clientX + Math.random() * 30 - 15,
                event.clientY + Math.random() * 30 - 15
            );
        }
    }
});

// FLOATING BACKGROUND

const heartsBg = document.getElementById("heartsBg");

function createHeart() {
    const heart = document.createElement("span");
    const symbols = ["🎈", "✨", "💛", "🎉"];

    heart.className = "float-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (13 + Math.random() * 18) + "px";
    heart.style.animationDuration = (6 + Math.random() * 5) + "s";

    heartsBg.appendChild(heart);

    setTimeout(() => heart.remove(), 11000);
}

setInterval(createHeart, 800);

showPage(0);