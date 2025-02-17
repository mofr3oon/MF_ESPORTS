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
<script>
  const form = document.getElementById("registration-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // لمنع الانتقال إلى الصفحة الأخرى بشكل افتراضي
    
    // إرسال البيانات عبر Formspree
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
    .then(response => {
      if (response.ok) {
        // توجيه إلى صفحة النجاح بعد إرسال البيانات بنجاح
        window.location.href = "success.html"; // يمكنك تغيير الرابط لصفحة النجاح التي أنشأتها
      } else {
        alert("حدث خطأ أثناء إرسال البيانات.");
      }
    })
    .catch(error => {
      alert("حدث خطأ في الاتصال.");
    });
  });
</script>
