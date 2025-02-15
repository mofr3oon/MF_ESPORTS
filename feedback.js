// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// تهيئة Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_g6NUkE0T2Bh54dbZP-n-h-ub8otlFI",
  authDomain: "pubgscream-d4a35.firebaseapp.com",
  projectId: "pubgscream-d4a35",
  storageBucket: "pubgscream-d4a35.firebasestorage.app",
  messagingSenderId: "320274957822",
  appId: "1:320274957822:web:d6b66b4632022ffdf4acaf",
  measurementId: "G-04104VRVJF"
};

// تهيئة التطبيق وقاعدة البيانات
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// إرسال الفيدباك إلى Firebase
async function submitFeedback() {
  const nameInput = document.getElementById("name-input").value.trim();
  const feedbackInput = document.getElementById("feedback-input").value.trim();
  const feedbackMessage = document.getElementById("feedback-message");

  if (nameInput === "" || feedbackInput === "") {
    feedbackMessage.innerHTML = `<p class="error-message">يرجى إدخال الاسم والفيد باك قبل الإرسال.</p>`;
    return;
  }

  try {
    await addDoc(collection(db, "feedback"), {
      name: nameInput,
      comment: feedbackInput,
      timestamp: new Date()
    });

    feedbackMessage.innerHTML = `<p class="success-message">تم إرسال الفيدباك بنجاح!</p>`;

    // تفريغ الحقول بعد الإرسال
    document.getElementById("name-input").value = "";
    document.getElementById("feedback-input").value = "";

    // إزالة الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
      feedbackMessage.innerHTML = "";
    }, 3000);

  } catch (error) {
    console.error("Error submitting feedback: ", error);
    feedbackMessage.innerHTML = `<p class="error-message">حدث خطأ أثناء الإرسال. حاول مرة أخرى.</p>`;
  }
}

// عرض الفيدباك بشكل مباشر عند إضافته إلى Firebase
function loadFeedback() {
  const feedbackContainer = document.getElementById("feedback-container");
  const noFeedbackMessage = document.getElementById("no-feedback-message");

  onSnapshot(collection(db, "feedback"), (snapshot) => {
    feedbackContainer.innerHTML = ""; // مسح التعليقات السابقة

    if (snapshot.empty) {
      noFeedbackMessage.style.display = "block";
    } else {
      noFeedbackMessage.style.display = "none";
      snapshot.forEach((doc) => {
        const feedbackData = doc.data();
        const feedbackElement = document.createElement("div");
        feedbackElement.classList.add("feedback-entry");
        feedbackElement.innerHTML = `
          <h3>${feedbackData.name}</h3>
          <p>${feedbackData.comment}</p>
        `;
        feedbackContainer.appendChild(feedbackElement);
      });
    }
  });
}

// تشغيل تحميل التعليقات عند فتح الصفحة
window.onload = loadFeedback;
window.submitFeedback = submitFeedback;
