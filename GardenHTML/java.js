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