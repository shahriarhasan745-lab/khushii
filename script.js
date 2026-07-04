let currentPasscode = "";
const correctPasscode = "2026"; // এটিই তোমার কোড
let musicStarted = false;
let currentSlideIdx = 0;

let viewedGifts = new Set();
let viewedSlides = new Set([0]);

const paragraphTexts = [
    "You bring a soft kind of magic to every day, and I hope today wraps you in calm moments, warm laughs, and the sweetest kind of peace.",
    "May this year be full of little wins, warm conversations and moments that remind just how loved you are.",
    "I love you ohhhuu 🐧"
];

function playMusicOnce() {
    if (!musicStarted) {
        const audio = document.getElementById("bg-music");
        if (audio) {
            audio.volume = 0.8;
            audio.play().then(() => {
                musicStarted = true;
                const indicator = document.getElementById("music-indicator");
                if (indicator) indicator.classList.add("playing");
            }).catch(err => console.log("Music interaction waiting..."));
        }
    }
}

function toggleMusic() {
    const audio = document.getElementById("bg-music");
    const indicator = document.getElementById("music-indicator");
    if (!audio || !indicator) return;
    
    if (audio.paused) {
        audio.play();
        indicator.classList.add("playing");
    } else {
        audio.pause();
        indicator.classList.remove("playing");
    }
}

function pressKey(num) {
    // মিউজিক ট্রিগার এবং নম্বর ইনপুট লগ
    playMusicOnce();
    console.log("Pressed key:", num); 
    
    if (currentPasscode.length < 4) {
        currentPasscode += num;
        updateDots();
    }
    if (currentPasscode.length === 4) {
        setTimeout(verifyPasscode, 300);
    }
}

function updateDots() {
    const dots = document.querySelectorAll(".dots-container .dot");
    dots.forEach((dot, idx) => {
        if (idx < currentPasscode.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }
    });
}

function verifyPasscode() {
    if (currentPasscode === correctPasscode) {
        switchScreen("lock-screen", "gift-screen");
    } else {
        switchScreen("lock-screen", "wrong-screen");
    }
}

function tryAgain() {
    currentPasscode = "";
    updateDots();
    switchScreen("wrong-screen", "lock-screen");
}

function switchScreen(fromId, toId) {
    const fromScreen = document.getElementById(fromId);
    const toScreen = document.getElementById(toId);
    if (fromScreen && toScreen) {
        fromScreen.classList.remove("active");
        toScreen.classList.add("active");
    }
}

function openGift(type) {
    playMusicOnce();
    viewedGifts.add(type);
    switchScreen("gift-screen", `gift-${type}`);
    
    if (type === 'camera') {
        startTypingEffect();
    }
    if (type === 'gallery') {
        showSlide(currentSlideIdx);
    }
    checkFinalUnlock();
}

function startTypingEffect() {
    const container = document.getElementById("typing-container");
    if (!container) return;
    container.innerHTML = "";
    
    paragraphTexts.forEach((text, index) => {
        const p = document.createElement("p");
        p.innerHTML = text;
        p.style.animationDelay = `${index * 2.5}s`; 
        container.appendChild(p);
    });
}

function flipVaultCard(card) {
    if (card) card.classList.toggle("flipped");
}

function showSlide(idx) {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;
    
    slides.forEach(s => s.classList.remove("active"));
    slides[idx].classList.add("active");
    
    viewedSlides.add(idx);
    const counter = document.getElementById("gallery-counter");
    if (counter) {
        counter.innerText = `View all photos to unlock the surprise: (${viewedSlides.size}/6)`;
    }
    checkFinalUnlock();
}

function nextSlide() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;
    currentSlideIdx = (currentSlideIdx + 1) % slides.length;
    showSlide(currentSlideIdx);
}

function prevSlide() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;
    currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
    showSlide(currentSlideIdx);
}

function checkFinalUnlock() {
    if (viewedGifts.size === 3 && viewedSlides.size === 6) {
        const finalBtn = document.getElementById("final-surprise-btn");
        if (finalBtn) finalBtn.style.display = "inline-block";
    }
}

function backToGifts() {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const giftScreen = document.getElementById("gift-screen");
    if (giftScreen) giftScreen.classList.add("active");
}

function goToProposal() {
    switchScreen("gift-gallery", "final-screen");
}

function moveNoButton() {
    const noBtn = document.getElementById("no-btn");
    if (!noBtn) return;
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 80);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function celebrate() {
    alert("Yay! Best day ever! ❤️ I love you too!");
}
