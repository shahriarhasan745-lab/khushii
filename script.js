const CORRECT_PIN = "1234"; // এখানে তোমার ৪ ডিজিটের কোডটি দাও 
let currentInput = "";
let musicStarted = false;

function playMusicOnce() {
    if (!musicStarted) {
        const music = document.getElementById('bg-music');
        music.play().catch(error => console.log("Audio play delayed"));
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

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < currentInput.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function tryAgain() {
    currentInput = "";
    updateDots();
    switchScreen("wrong-screen", "lock-screen");
}

function openGift() {
    switchScreen("gift-screen", "final-screen");
}

function switchScreen(fromId, toId) {
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(toId).classList.add('active');
}

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function celebrate() {
    alert("Yayyy! 🥰 ❤️ I knew it! You just made my world beautiful!");
}
