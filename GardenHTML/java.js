// Function to make the floating box draggable
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var header = element.querySelector(".FloatingBoxHeader");

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Function to show the floating box
function showFloatingBox(triggerSelector, boxSelector) {
    document.querySelector(triggerSelector).addEventListener('click', function() {
        var floatingBox = document.querySelector(boxSelector);
        floatingBox.style.display = 'block';
        dragElement(floatingBox);
    });
}

// Function to close the floating box
function addCloseButton(boxSelector) {
    var closeBtn = document.querySelector(boxSelector + ' .closeBtn');
    closeBtn.addEventListener('click', function() {
        var floatingBox = document.querySelector(boxSelector);
        floatingBox.style.display = 'none';
    });
}

// Link images to popups
showFloatingBox('#bush', '#floatingBoxBush');
showFloatingBox('#bush2', '#floatingBoxBush2');
showFloatingBox('#magpie', '#floatingBoxMagpie');
showFloatingBox('#shroom', '#floatingBoxShroom');
showFloatingBox('#tree128px', '#floatingBoxTree');

// Add close functionality
addCloseButton('#floatingBoxBush');
addCloseButton('#floatingBoxBush2');
addCloseButton('#floatingBoxMagpie');
addCloseButton('#floatingBoxShroom');
addCloseButton('#floatingBoxTree');


/* Function for the PATHHH */

// Select both paths
let paths = document.querySelectorAll('.path');

// Function to animate each path
function animatePath(path) {
    let pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', function() { 
        // Calculate the scroll percentage
        var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

        // Adjust scroll percentage to be 2/3 speed
        scrollPercentage = scrollPercentage * (2.5/3);

        // Calculate the length of the path to draw
        var drawLength = pathLength * scrollPercentage;

        // Update the strokeDashoffset to draw the path
        path.style.strokeDashoffset = pathLength - drawLength;
    });
}

// Loop through each path and animate it
paths.forEach(function(path) {
    animatePath(path);
});



/* Function for the BUTTERFLY */
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('butterflyCanvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 700;

    const butterflySprite = new Image();
    butterflySprite.src = 'bwSprite.png';
    const spriteWidth = 64;
    const spriteHeight = 64;
    const totalFrames = 6;

    class Butterfly {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed = 0.2 + Math.random() * 1;
            this.direction = Math.random() * Math.PI * 2;
            this.currentFrame = Math.floor(Math.random() * totalFrames);
            this.frameCounter = 0;
        }

        update() {
            // Update position
            this.x += Math.cos(this.direction) * this.speed;
            this.y += Math.sin(this.direction) * this.speed;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width - spriteWidth) {
                this.direction = Math.PI - this.direction;
            }
            if (this.y < 0 || this.y > canvas.height - spriteHeight) {
                this.direction = -this.direction;
            }

            // Randomly change direction occasionally
            if (Math.random() < 0.02) {
                this.direction += (Math.random() - 0.5) * Math.PI / 2;
            }

            // Update animation frame
            this.frameCounter++;
            if (this.frameCounter >= 40) { // Change frame every 5 updates
                this.currentFrame = (this.currentFrame + 1) % totalFrames;
                this.frameCounter = 0;
            }
        }

        draw() {
            const frameX = this.currentFrame * spriteWidth;
            context.drawImage(
                butterflySprite,
                frameX, 0,
                spriteWidth, spriteHeight,
                this.x, this.y,
                spriteWidth, spriteHeight
            );
        }
    }

    const butterflies = Array(5).fill().map(() => new Butterfly());

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        butterflies.forEach(butterfly => {
            butterfly.update();
            butterfly.draw();
        });

        requestAnimationFrame(animate);
    }

    butterflySprite.onload = function() {
        animate();
    };

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = 700;
    });
});