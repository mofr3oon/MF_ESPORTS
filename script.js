// Show notification
window.onload = function() {
   const notification = document.getElementById('notification');
   notification.style.display = 'block';
   setTimeout(function() {
      notification.style.display = 'none';
   }, 3000);
};

// Add mouse interaction effect
document.addEventListener('mousemove', function(e) {
   let x = e.clientX;
   let y = e.clientY;
   document.querySelector('.message-box').style.transform = `translate(${x / 20}px, ${y / 20}px)`;
});
