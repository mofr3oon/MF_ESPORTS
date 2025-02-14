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
  // إرسال الفيدباك وحفظه في Firestore
  document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const feedbackText = document.getElementById('feedback').value;

    db.collection("feedbacks").add({
      feedback: feedbackText,
      timestamp: new Date()
    }).then(() => {
      alert('تم إرسال الفيدباك بنجاح!');
      document.getElementById('feedback').value = ''; // إفراغ الحقل
      loadFeedback(); // تحديث العرض
    }).catch(error => {
      console.error("خطأ أثناء إرسال الفيدباك: ", error);
    });
  });

  // عرض كل الفيدباك المخزن في Firestore
  function loadFeedback() {
    document.getElementById('feedbackDisplay').innerHTML = ''; // تفريغ العرض الحالي
    db.collection("feedbacks").orderBy("timestamp", "desc").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const feedbackItem = document.createElement('p');
        feedbackItem.textContent = doc.data().feedback;
        document.getElementById('feedbackDisplay').appendChild(feedbackItem);
      });
    });
  }

  // تحميل الفيدباك عند فتح الصفحة
  loadFeedback();
</script>
