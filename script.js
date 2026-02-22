document.addEventListener("scroll", () => {
    const viewportHeight = window.innerHeight;
    const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;

    document.querySelectorAll("section").forEach(section => {
        const progressBar = section.querySelector(".progress-line");
        if (!progressBar) return;

        const rect = section.getBoundingClientRect();

        const sectionStart = rect.top - navbarHeight;
        const sectionEnd = rect.bottom - navbarHeight;

        if (sectionEnd <= 0 || sectionStart >= viewportHeight) {
            progressBar.style.width = "0%";
            return;
        }

        const visibleHeight = Math.min(viewportHeight, sectionEnd) - Math.max(0, sectionStart);
        const progress = Math.min(Math.max((visibleHeight / rect.height) * 100, 0), 100);

        progressBar.style.width = `${progress}%`;
    });
});


const scrollBtn = document.getElementById("scrollTopBtn");
const progressCircle = document.getElementById("progressCircle");

const radius = 26;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollTop / scrollHeight;
    const offset = circumference - progress * circumference;

    progressCircle.style.strokeDashoffset = offset;

    scrollBtn.style.display = scrollTop > 200 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.5;
    ringY += (mouseY - ringY) * 0.5;

    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';

    requestAnimationFrame(animateRing);
}

animateRing();