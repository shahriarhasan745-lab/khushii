const slides = [
    { img: "Screenshot 2026-03-03 155312.png", title: "My Queen", desc: "Happy Birthday to the most special person! ❤️" },
    { img: "Screenshot 2026-03-03 155243.png", title: "Beautiful Smile", desc: "Your smile is my favorite thing in the world." },
    { img: "Screenshot 2026-03-03 155353.png", title: "Pure Magic", desc: "You make every moment magical. ✨" },
    { img: "Screenshot 2026-03-03 155410.png", title: "Always Together", desc: "I'm so glad you were born today! 😍" }
];

let index = 0;
const intro = document.getElementById('intro-overlay');
const main = document.getElementById('main-content');
const audio = document.getElementById('myAudio');
const imgEl = document.getElementById('slider-img');
const titleEl = document.getElementById('title');
const descEl = document.getElementById('desc');

// ৫ সেকেন্ড পর ইন্ট্রো সরিয়ে মেইন কন্টেন্ট দেখানো
setTimeout(() => {
    intro.style.opacity = '0';
    setTimeout(() => {
        intro.style.display = 'none';
        main.style.display = 'block';
        updateSlide();
        // অটো গান শুরু করার চেষ্টা (ব্রাউজার পারমিশন দিলে)
        audio.play().catch(() => console.log("Click the play button for music"));
    }, 1500);
}, 5000);

function updateSlide() {
    titleEl.classList.remove('animate-text');
    descEl.classList.remove('animate-text');
    imgEl.style.opacity = '0.7';

    setTimeout(() => {
        imgEl.src = slides[index].img;
        titleEl.innerText = slides[index].title;
        descEl.innerText = slides[index].desc;
        imgEl.style.opacity = '1';
        titleEl.classList.add('animate-text');
        descEl.classList.add('animate-text');
    }, 500);
}

// প্রতি ৪ সেকেন্ড পর পর ছবি অটো বদলাবে
setInterval(() => {
    if (main.style.display !== 'none') {
        index = (index + 1) % slides.length;
        updateSlide();
    }
}, 4000);

// মিউজিক বাটন
document.getElementById('playBtn').addEventListener('click', function() {
    if (audio.paused) { audio.play(); this.innerText = "⏸ Pause"; }
    else { audio.pause(); this.innerText = "🎵 Play"; }
});

// ব্যাকগ্রাউন্ড হার্ট এনিমেশন
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}
setInterval(createHeart, 400);
