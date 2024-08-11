document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const title = section.querySelector('h2');
        const content = section.querySelector('.content');

        title.addEventListener('click', () => {
            section.classList.toggle('active');
            content.style.display = section.classList.contains('active') ? 'block' : 'none';
        });
    });
});