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
function showFloatingBox(trigger) {
  var targetId = trigger.getAttribute('data-target');
  var floatingBox = document.getElementById(targetId);
  floatingBox.style.display = 'block';
  dragElement(floatingBox);
}

// Function to close the floating box
function closeFloatingBox(closeBtn) {
  var floatingBox = closeBtn.closest('.floatingBox');
  floatingBox.style.display = 'none';
}

// Add event listeners to the popup triggers
var popupTriggers = document.querySelectorAll('.popupTrigger');
popupTriggers.forEach(function(trigger) {
  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    showFloatingBox(this);
  });
});

// Add event listeners to the close buttons
var closeButtons = document.querySelectorAll('.closeBtn');
closeButtons.forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeFloatingBox(this);
  });
});

document.getElementById('continueButton').addEventListener('click', function() {
  document.getElementById('landingPage').classList.add('fade-out');
  setTimeout(function() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('mainContent').classList.add('show');
    document.body.style.overflow = 'auto'; // Allow scrolling after landing page is hidden
  }, 1000); // Match the duration of the fadeOut animation
});