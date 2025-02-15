// استيراد المكتبات من Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_g6NUkE0T2Bh54dbZP-n-h-ub8otlFI",
  authDomain: "pubgscream-d4a35.firebaseapp.com",
  projectId: "pubgscream-d4a35",
  storageBucket: "pubgscream-d4a35.firebasestorage.app",
  messagingSenderId: "320274957822",
  appId: "1:320274957822:web:d6b66b4632022ffdf4acaf",
  measurementId: "G-04104VRVJF"
};

// تهيئة التطبيق وربط قاعدة البيانات
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// دالة إرسال الفيد باك
async function submitFeedback() {
  const nameInput = document.getElementById("name-input").value.trim();
  const feedbackInput = document.getElementById("feedback-input").value.trim();
  const feedbackMessage = document.getElementById("feedback-message");

  // تحقق من إدخال البيانات
  if (nameInput && feedbackInput) {
    try {
      // إرسال البيانات إلى Firestore
      await addDoc(collection(db, "feedback"), { name: nameInput, comment: feedbackInput });

      // إظهار رسالة نجاح
      feedbackMessage.innerHTML = `<p class="success-message">تم إرسال الفيد باك بنجاح!</p>`;

      // إعادة تعيين الحقول
      document.getElementById("name-input").value = "";
      document.getElementById("feedback-input").value = "";

      // إزالة الرسالة بعد 5 ثواني
      setTimeout(() => {
        feedbackMessage.innerHTML = "";
      }, 5000);

      // إعادة تحميل التعليقات
      loadFeedback();
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      feedbackMessage.innerHTML = `<p class="error-message">حدث خطأ أثناء إرسال الفيد باك. حاول مرة أخرى.</p>`;
    }
  } else {
    feedbackMessage.innerHTML = `<p class="error-message">يرجى إدخال الاسم والفيد باك قبل الإرسال.</p>`;
  }
}

// جعل الدالة متاحة في النموذج
window.submitFeedback = submitFeedback;

// دالة تحميل الفيد باك من قاعدة البيانات
async function loadFeedback() {
  const feedbackContainer = document.getElementById("feedback-container");
  feedbackContainer.innerHTML = "";

  try {
    // جلب البيانات من Firestore
    const querySnapshot = await getDocs(collection(db, "feedback"));
    querySnapshot.forEach((doc) => {
      const feedbackData = doc.data();

      // إنشاء عنصر جديد لكل تعليق
      const feedbackElement = document.createElement("div");
      feedbackElement.className = "feedback-entry"; // استخدام كلاس منظم
      feedbackElement.innerHTML = `
        <h3>${feedbackData.name}</h3>
        <p>${feedbackData.comment}</p>
      `;
      feedbackContainer.appendChild(feedbackElement);
    });
  } catch (error) {
    console.error("Error loading feedback: ", error);
    alert("حدث خطأ أثناء تحميل الفيد باك.");
  }
}

// تحميل التعليقات عند فتح الصفحة
window.onload = loadFeedback;
