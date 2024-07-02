// JavaScript for dragging the floating box
var floatingBox = document.querySelector('.floatingBox');
var boxContent = document.querySelector('.floatingBox .boxContent');
var posX = 0, posY = 0;
var isDragging = false;

boxContent.addEventListener('mousedown', function(e) {
    isDragging = true;
    posX = e.clientX - floatingBox.offsetLeft;
    posY = e.clientY - floatingBox.offsetTop;
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        floatingBox.style.left = e.clientX - posX + 'px';
        floatingBox.style.top = e.clientY - posY + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

// JavaScript for closing the floating box
function closeFloatingBox() {
    var floatingBox = document.querySelector('.floatingBox');
    floatingBox.style.display = 'none';
}

function toggleFloatingBox() {
    var floatingBox = document.querySelector('.floatingBox');
    if (floatingBox.style.display === 'none' || floatingBox.style.display === '') {
        floatingBox.style.display = 'block';
    } else {
        floatingBox.style.display = 'none';
    }
}

particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 5,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "image",
            "image": {
                "src": "drone.png",
                "width": 100,  // Width of the image
                "height": 100  // Height of the image
            }
        // Other particle configurations
        },
        // Other options like interactivity, etc.
        "line_linked": {
    "enable": false},
    


        }});

        var iframe = document.getElementById('vimeoVideo');
        player.setVolume(0);
