const sections = document.querySelectorAll('.section');
let currentSection = 0;

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
    }
    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelector('.section-content').classList.add('glow');
        } else {
            entry.target.querySelector('.section-content').classList.remove('glow');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Video list functionality
const videoList = document.querySelector('.video-list');
const videoItems = document.querySelectorAll('.video-item');
const gradientBg = document.querySelector('.gradient-bg');
const backgroundVideo = document.querySelector('#section2 .background-video');

let activeIndex = 0;

function updateActiveItem() {
    videoItems.forEach((item, index) => {
        if (index === activeIndex) {
            item.classList.add('active');
            gradientBg.style.top = `${item.offsetTop - 75}px`;
            backgroundVideo.src = item.dataset.video;
        } else {
            item.classList.remove('active');
        }
    });
}

videoList.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY > 0 && activeIndex < videoItems.length - 1) {
        activeIndex++;
    } else if (e.deltaY < 0 && activeIndex > 0) {
        activeIndex--;
    }
    updateActiveItem();
});

updateActiveItem();