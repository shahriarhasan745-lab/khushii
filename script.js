const slides = [
    { img: "Screenshot 2026-03-03 155312.png", title: "Instant Spark", desc: "Every time you smile, the world gets brighter. 😊" },
    { img: "Screenshot 2026-03-03 155243.png", title: "Strong Connection", desc: "Feeling a really strong connection with you. ❤️" },
    { img: "Screenshot 2026-03-03 155353.png", title: "Pure Magic", desc: "You are the magic I always wanted. ✨" },
    { img: "Screenshot 2026-03-03 155410.png", title: "Favorite View", desc: "No view is better than you. 😍" },
    { img: "Screenshot 2026-03-03 155444.png", title: "Eternal Bond", desc: "Meant to be, forever and always." },
    { img: "Messenger_creation_6168EF5D-923D-4473-8A39-E093DC2E6E4B.jpeg", title: "Breathless", desc: "You just took my breath away." }
];

let index = 0;
const imgEl = document.getElementById('slider-img');
const titleEl = document.getElementById('title');
const descEl = document.getElementById('desc');
const audio = document.getElementById('myAudio');
const playBtn = document.getElementById('playBtn');

function updateSlide() {
    titleEl.classList.remove('animate-text');
    descEl.classList.remove('animate-text');
    setTimeout(() => {
        imgEl.src = slides[index].img;
        titleEl.innerText = slides[index].title;
        descEl.innerText = slides[index].desc;
        titleEl.classList.add('animate-text');
        descEl.classList.add('animate-text');
    }, 50);
}

// হার্ট তৈরির ফাংশন (amore-tau এর মতো)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.getElementById('hearts-container').appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}

setInterval(createHeart, 300); // প্রতি ৩০০ মিলি-সেকেন্ডে একটি হার্ট তৈরি হবে

document.getElementById('next').addEventListener('click', () => { index = (index + 1) % slides.length; updateSlide(); });
document.getElementById('prev').addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; updateSlide(); });

playBtn.addEventListener('click', () => {
    if (audio.paused) { audio.play(); playBtn.innerText = "⏸ Pause"; }
    else { audio.pause(); playBtn.innerText = "🎵 Play"; }
});

window.onload = updateSlide;
