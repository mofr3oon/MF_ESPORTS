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

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");

    // استرجاع البيانات المحفوظة عند تحميل الصفحة
    form.querySelectorAll("input").forEach(input => {
        const savedValue = localStorage.getItem(input.name);
        if (savedValue) {
            input.value = savedValue;
        }
    });

    // حفظ البيانات عند الكتابة في الحقول
    form.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", function () {
            localStorage.setItem(input.name, input.value);
        });
    });

    // مسح البيانات من localStorage عند إرسال الفورم
    form.addEventListener("submit", function () {
        localStorage.clear();
    });
});
<script>
