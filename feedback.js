// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_g6NUkE0uT2Bh54dbZP-n-h-ub8otlFI",
  authDomain: "pubgscream-d4a35.firebaseapp.com",
  projectId: "pubgscream-d4a35",
  storageBucket: "pubgscream-d4a35.firebasestorage.app",
  messagingSenderId: "320274957822",
  appId: "1:320274957822:web:d6b66b4632022ffdf4acaf",
  measurementId: "G-04104VRVJF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تحميل التعليقات الموجودة عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadFeedback);

async function loadFeedback() {
  try {
    const feedbackCollection = collection(db, "feedback");
    const feedbackSnapshot = await getDocs(feedbackCollection);
    const feedbackList = feedbackSnapshot.docs.map(doc => doc.data());
    displayFeedback(feedbackList);
  } catch (error) {
    console.error("Error loading feedback: ", error);
  }
}

function displayFeedback(feedbackList) {
  const feedbackContainer = document.getElementById('feedback-container');
  feedbackContainer.innerHTML = '';

  feedbackList.forEach(feedback => {
    const div = document.createElement('div');
    div.className = "feedback-item";
    div.innerHTML = `<strong>${feedback.name}:</strong> ${feedback.comment}`;
    feedbackContainer.appendChild(div);
  });
}

// إرسال feedback جديد
window.submitFeedback = async function () {
  const nameInput = document.getElementById("name-input").value;
  const feedbackInput = document.getElementById("feedback-input").value;

  if (nameInput && feedbackInput) {
    try {
      // إضافة التعليق إلى Firestore
      await addDoc(collection(db, "feedback"), { name: nameInput, comment: feedbackInput });

      // عرض رسالة النجاح
      const feedbackMessage = document.getElementById("feedback-message");
      feedbackMessage.innerHTML = `<p class="success-message">تم إرسال الفيد باك بنجاح!</p>`;

      // إعادة تحميل التعليقات
      loadFeedback();

      // تفريغ الحقول
      document.getElementById("name-input").value = '';
      document.getElementById("feedback-input").value = '';
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      alert("حدث خطأ أثناء إرسال الفيد باك. حاول مرة أخرى.");
    }
  } else {
    alert("يرجى إدخال الاسم والفيد باك قبل الإرسال.");
  }
};
