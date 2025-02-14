// استيراد Firebase
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// تهيئة قاعدة البيانات
const db = getFirestore();

// تحميل التعليقات الموجودة
document.addEventListener('DOMContentLoaded', loadFeedback);

async function loadFeedback() {
  try {
    const feedbackCollection = collection(db, "feedback");
    const feedbackSnapshot = await getDocs(feedbackCollection);
    const feedbackList = feedbackSnapshot.docs.map(doc => doc.data().comment);
    displayFeedback(feedbackList);
  } catch (error) {
    console.error("Error loading feedback: ", error);
  }
}

function displayFeedback(feedback) {
  const feedbackContainer = document.getElementById('feedback-container');
  feedbackContainer.innerHTML = '';

  feedback.forEach(comment => {
    const div = document.createElement('div');
    div.textContent = comment;
    feedbackContainer.appendChild(div);
  });
}

// إرسال feedback جديد
window.submitFeedback = async function () {
  const feedbackInput = document.getElementById("feedback-input").value;
  if (feedbackInput) {
    try {
      // إضافة التعليق إلى Firestore
      await addDoc(collection(db, "feedback"), { comment: feedbackInput });
      alert("Feedback submitted successfully!");
      
      // إعادة تحميل التعليقات
      loadFeedback();
      
      // تفريغ حقل الإدخال
      document.getElementById("feedback-input").value = '';
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      alert("Error submitting feedback. Please try again.");
    }
  } else {
    alert("Please enter feedback before submitting.");
  }
};
<script>
  window.submitFeedback = submitFeedback;
</script>


feedback.js
