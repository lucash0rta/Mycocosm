// Global variables
var canvas, canvasContext,
    playerX = 400,
    playerY = 400,
    playerW = 32,  // Adjust based on your player image size
    playerH = 32,  // Adjust based on your player image size
    playerSpeedX = 0,
    playerSpeedY = 0;
/* global Array for collisions */
var collisionOrder = [];

// Object properties
var objects = [
    { id: 'red', x: 200, y: 200, w: 30, h: 50, image: null },
    { id: 'blue', x: 400, y: 300, w: 40, h: 60, image: null }
    // Add more objects as needed
];

var playerImage = new Image();

// Initialize the game when the window loads
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    resizeCanvas();

    loadImages();

    var framesPerSecond = 60;
    setInterval(function() {
        playerMove();
        drawAll();
    }, 1000 / framesPerSecond);

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', updateMousePos);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    // Initialize popup containers
    initializePopups();

    document.getElementById('upBtn').addEventListener('touchstart', () => keyHeld_Up = true);
    document.getElementById('upBtn').addEventListener('touchend', () => keyHeld_Up = false);
    document.getElementById('leftBtn').addEventListener('touchstart', () => keyHeld_Left = true);
    document.getElementById('leftBtn').addEventListener('touchend', () => keyHeld_Left = false);
    document.getElementById('downBtn').addEventListener('touchstart', () => keyHeld_Down = true);
    document.getElementById('downBtn').addEventListener('touchend', () => keyHeld_Down = false);
    document.getElementById('rightBtn').addEventListener('touchstart', () => keyHeld_Right = true);
    document.getElementById('rightBtn').addEventListener('touchend', () => keyHeld_Right = false);
}

/* EventListeners for buttons */

// Add event listeners for virtual buttons
document.getElementById('up').addEventListener('touchstart', () => keyHeld_Up = true);
document.getElementById('down').addEventListener('touchstart', () => keyHeld_Down = true);
document.getElementById('left').addEventListener('touchstart', () => keyHeld_Left = true);
document.getElementById('right').addEventListener('touchstart', () => keyHeld_Right = true);

document.getElementById('up').addEventListener('touchend', () => keyHeld_Up = false);
document.getElementById('down').addEventListener('touchend', () => keyHeld_Down = false);
document.getElementById('left').addEventListener('touchend', () => keyHeld_Left = false);
document.getElementById('right').addEventListener('touchend', () => keyHeld_Right = false);

// Add event listeners for mouse events
document.getElementById('up').addEventListener('mousedown', () => keyHeld_Up = true);
document.getElementById('down').addEventListener('mousedown', () => keyHeld_Down = true);
document.getElementById('left').addEventListener('mousedown', () => keyHeld_Left = true);
document.getElementById('right').addEventListener('mousedown', () => keyHeld_Right = true);

document.addEventListener('mouseup', () => {
    keyHeld_Up = false;
    keyHeld_Down = false;
    keyHeld_Left = false;
    keyHeld_Right = false;
});

// Additionally, stop movement if the mouse leaves the button area
document.getElementById('up').addEventListener('mouseleave', () => keyHeld_Up = false);
document.getElementById('down').addEventListener('mouseleave', () => keyHeld_Down = false);
document.getElementById('left').addEventListener('mouseleave', () => keyHeld_Left = false);
document.getElementById('right').addEventListener('mouseleave', () => keyHeld_Right = false);

// Prevent default behavior for touch events
document.addEventListener('touchstart', (evt) => evt.preventDefault(), { passive: false });
document.addEventListener('touchend', (evt) => evt.preventDefault(), { passive: false });



function loadImages() {
    playerImage.src = 'obj.png';  // Replace with your player image path
    objects.forEach(obj => {
        obj.image = new Image();
        obj.image.src = `${obj.id}-image.png`;  // Replace with your object image paths
    });
}


// Key codes for controls
var KEY_W = 87,
    KEY_A = 65,
    KEY_S = 83,
    KEY_D = 68;

// Key state variables
var keyHeld_Down = false,
    keyHeld_Up = false,
    keyHeld_Left = false,
    keyHeld_Right = false,
    mouseX = 0,
    mouseY = 0;

// Update mouse position
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

// Handle key press events
function keyPressed(evt) {
    if (evt.keyCode == KEY_A) { keyHeld_Left = true; }
    if (evt.keyCode == KEY_D) { keyHeld_Right = true; }
    if (evt.keyCode == KEY_W) { keyHeld_Up = true; }
    if (evt.keyCode == KEY_S) { keyHeld_Down = true; }
    evt.preventDefault();
}

// Handle key release events
function keyReleased(evt) {
    if (evt.keyCode == KEY_A) { keyHeld_Left = false; }
    if (evt.keyCode == KEY_D) { keyHeld_Right = false; }
    if (evt.keyCode == KEY_W) { keyHeld_Up = false; }
    if (evt.keyCode == KEY_S) { keyHeld_Down = false; }
}

// Update player movement and check for collisions
function playerMove() {
    if (keyHeld_Up) {
        playerSpeedY = -7;
    } else if (keyHeld_Down) {
        playerSpeedY = 7;
    } else {
        playerSpeedY = 0;
    }

    if (keyHeld_Left) {
        playerSpeedX = -7;
    } else if (keyHeld_Right) {
        playerSpeedX = 7;
    } else {
        playerSpeedX = 0;
    }

    playerX += playerSpeedX;
    playerY += playerSpeedY;

    // Handle screen wrapping
    if (playerY <= 0) {
        playerY = canvas.height - playerH + 2;
    } else if (playerY >= canvas.height - playerH) {
        playerY = 2;
    }
    if (playerX >= canvas.width - playerW) {
        playerX = 2;
    } else if (playerX <= 0) {
        playerX = canvas.width - playerW + 2;
    }

    // Check collision with all objects
    objects.forEach(obj => {
        if (isCollision(playerX, playerY, playerW, playerH, obj.x, obj.y, obj.w, obj.h)) {
            console.log("Collision detected with " + obj.id + " object!");
            // Remove the object ID if it's already in the array
            collisionOrder = collisionOrder.filter(id => id !== obj.id);
            // Add the object ID to the end of the array
            collisionOrder.push(obj.id);
            showPopup(obj.id);
        }
    });
}

// Check for collision
function isCollision(px, py, pw, ph, ox, oy, ow, oh) {
    return px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy;
}

// Draw all game elements
function drawAll() {
    /* canvasContext.clearRect(0, 0, canvas.width, canvas.height); */

    // Draw player
    canvasContext.drawImage(playerImage, playerX, playerY, playerW, playerH);
    
    // Draw all objects
    objects.forEach(obj => {
        if (obj.image) {
            canvasContext.drawImage(obj.image, obj.x, obj.y, obj.w, obj.h);
        }
    });

    colorText("Control With: W-A-S-D", 10, canvas.height - 10, 'grey');
}

// Draw a filled rectangle
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

// Draw text
function colorText(shownText, xPos, yPos, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillText(shownText, xPos, yPos);
}

function resizeCanvas() {
    var container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    console.log("Canvas resized to:", canvas.width, "x", canvas.height);
    // Redraw canvas content here if needed
}

// Popup management
var popupContainers;

// Initialize popup containers
function initializePopups() {
    popupContainers = document.querySelectorAll('.popup-container');
    
    // Set up close buttons
    document.querySelectorAll('.closeBtn').forEach(btn => {
        btn.onclick = function() {
            this.closest('.popup-container').style.display = 'none';
        };
    });
}

function showPopup(objectId) {
    // First, ensure the collided object's popup is visible
    popupContainers.forEach(container => {
        if (container.dataset.objectId === objectId) {
            container.style.display = 'block';
            // Move the collided object's popup to the end of collisionOrder to make it topmost
            collisionOrder = collisionOrder.filter(id => id !== objectId); // Remove current id
            collisionOrder.push(objectId); // Add it back to ensure it's the last one
        }
    });

    // Then, adjust the order of all popups based on collisionOrder
    popupContainers.forEach((container, index) => {
        let orderIndex = collisionOrder.indexOf(container.dataset.objectId);
        if (orderIndex !== -1) {
            container.style.order = orderIndex;
        } else {
            // If the popup's object hasn't collided yet, hide it
            container.style.display = 'none';
        }
    });
}

document.addEventListener('touchstart', (evt) => evt.preventDefault(), {passive: false});
document.addEventListener('touchend', (evt) => evt.preventDefault(), {passive: false});