let currentPasscode = "";
const correctPasscode = "2026"; // Passcode
let musicStarted = false;
let currentSlideIdx = 0;

let viewedGifts = new Set();
let viewedSlides = new Set([0]);

const paragraphTexts = [
    `"Golden brown, texture like sun. Lays me down, with my mind she runs."`,
    `You bring a soft kind of magic to every single day. Out of all the people in the world, my eyes always secretly search for you.`,
    `Spending time with you is my absolute favorite escape.`
];

// Robust function to force audio trigger on any click interaction
function playMusicOnce() {
    if (!musicStarted) {
        const audio = document.getElementById("bg-music");
        audio.volume = 0.8; // Set volume level
        audio.play().then(() => {
            musicStarted = true;
            document.getElementById("music-indicator").classList.add("playing");
        }).catch(err => {
            console.log("Autoplay blocked by browser. Retrying on keypress...");
        });
    }
}

function toggleMusic() {
    const audio = document.getElementById("bg-music");
    const indicator = document.getElementById("music-indicator");
    if (audio.paused) {
        audio.play();
        indicator.classList.add("playing");
    } else {
        audio.pause();
        indicator.classList.remove("playing");
    }
}

function pressKey(num) {
    playMusicOnce(); // Attempts to unlock audio contextual block on keypress
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
        if (idx < currentPasscode.length) dot.classList.add("filled");
        else dot.classList.remove("filled");
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
    document.getElementById(fromId).classList.remove("active");
    document.getElementById(toId).classList.add("active");
}

function openGift(type) {
    playMusicOnce(); // Backup audio trigger
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
    container.innerHTML = "";
    
    paragraphTexts.forEach((text, index) => {
        const p = document.createElement("p");
        if(index === 0) p.classList.add("lyrics-style");
        p.innerHTML = text;
        p.style.animationDelay = `${index * 2.5}s`; 
        container.appendChild(p);
    });
}

function flipVaultCard(card) {
    if(!card.querySelector('.vault-card-inner')){
        card.innerHTML = `<div class="vault-card-inner">${card.innerHTML}</div>`;
    }
    card.classList.toggle("flipped");
}

function showSlide(idx) {
    const slides = document.querySelectorAll(".slide");
    slides.forEach(s => s.classList.remove("active"));
    slides[idx].classList.add("active");
    
    viewedSlides.add(idx);
    document.getElementById("gallery-counter").innerText = `View all photos to unlock the surprise: (${viewedSlides.size}/7)`;
    checkFinalUnlock();
}

function nextSlide() {
    const slides = document.querySelectorAll(".slide");
    currentSlideIdx = (currentSlideIdx + 1) % slides.length;
    showSlide(currentSlideIdx);
}

function prevSlide() {
    const slides = document.querySelectorAll(".slide");
    currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
    showSlide(currentSlideIdx);
}

function checkFinalUnlock() {
    if (viewedGifts.size === 3 && viewedSlides.size === 7) {
        document.getElementById("final-surprise-btn").style.display = "inline-block";
    }
}

function backToGifts() {
    const vault = document.querySelector('.vault-card');
    if(vault) vault.classList.remove('flipped');
    
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById("gift-screen").classList.add("active");
}

function goToProposal() {
    switchScreen("gift-gallery", "final-screen");
}

function moveNoButton() {
    const noBtn = document.getElementById("no-btn");
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 80);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function celebrate() {
    alert("Yay! Best day ever! ❤️ I love you too!");
}
