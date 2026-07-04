const CORRECT_PIN = "1234"; // তোমার পছন্দের ৪ ডিজিটের কোড এখানে দাও
let currentInput = "";
let musicStarted = false;
let currentSlideIdx = 0;

function playMusicOnce() {
    if (!musicStarted) {
        const music = document.getElementById('bg-music');
        music.play().catch(() => console.log("Music play auto-blocked by browser"));
        musicStarted = true;
    }
}

function pressKey(num) {
    playMusicOnce();
    if (currentInput.length < 4) {
        currentInput += num;
        updateDots();
    }
    if (currentInput.length === 4) {
        setTimeout(() => {
            if (currentInput === CORRECT_PIN) {
                switchScreen("lock-screen", "gift-screen");
            } else {
                switchScreen("lock-screen", "wrong-screen");
            }
        }, 300);
    }
}

// Keypad dot indicator updater
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if (idx < currentInput.length) dot.classList.add('filled');
        else dot.classList.remove('filled');
    });
}

function tryAgain() {
    currentInput = "";
    updateDots();
    switchScreen("wrong-screen", "lock-screen");
}

function openGift(giftType) {
    switchScreen("gift-screen", `gift-${giftType}`);
}

function backToGifts() {
    const activeScreen = document.querySelector('.screen.active');
    switchScreen(activeScreen.id, "gift-screen");
}

// Polaroid Image Slider Navigation
function showSlide(idx) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));
    slides[idx].classList.add('active');
    
    // Shows final button only when the user goes through all photos
    if (idx === slides.length - 1) {
        document.querySelector('.final-proposal-trigger').style.display = 'inline-block';
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlideIdx = (currentSlideIdx + 1) % slides.length;
    showSlide(currentSlideIdx);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
    showSlide(currentSlideIdx);
}

function goToProposal() {
    switchScreen("gift-gallery", "final-screen");
}

function switchScreen(fromId, toId) {
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(toId).classList.add('active');
}

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 100);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 100);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function celebrate() {
    alert("Yayyy! 🥰 ❤️ You just made me the happiest person alive!");
}
