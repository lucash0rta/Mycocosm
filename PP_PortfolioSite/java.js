/* document.addEventListener('DOMContentLoaded', function() {
    const projectRows = document.querySelectorAll('.project-row');

    projectRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#f0f0f0';
        });
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = 'transparent';
        });
    });
}); */

document.addEventListener('DOMContentLoaded', function() {
    var scrollToTopBtn = document.getElementById("scroll-to-top");
    var rootElement = document.documentElement;

    function handleScroll() {
        // Show button when page is scrolled down 100px
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if ((rootElement.scrollTop / scrollTotal) > 0.20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    function scrollToTop(duration) {
        var start = rootElement.scrollTop;
        var startTime = performance.now();

        function animateScroll(currentTime) {
            var timeElapsed = currentTime - startTime;
            var progress = Math.min(timeElapsed / duration, 1);
            var easeProgress = 1 - Math.pow(1 - progress, 4); // Easing function
            rootElement.scrollTop = start * (1 - easeProgress);
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    scrollToTopBtn.addEventListener("click", function(e) {
        e.preventDefault();
        scrollToTop(1000); // Scroll duration in milliseconds
    });

    window.addEventListener("scroll", handleScroll);
});