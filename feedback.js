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

// دالة إرسال الفيدباك
async function submitFeedback() {
  const nameInput = document.getElementById("name-input").value.trim();
  const feedbackInput = document.getElementById("feedback-input").value.trim();
  const feedbackMessage = document.getElementById("feedback-message");

  // تحقق من إدخال البيانات
  if (nameInput && feedbackInput) {
    try {
      console.log("إرسال الفيدباك إلى Firestore...");
      await addDoc(collection(db, "feedback"), { name: nameInput, comment: feedbackInput });
      console.log("تمت إضافة الفيدباك بنجاح!");

      // إظهار رسالة نجاح
      feedbackMessage.innerHTML = `<p class="success-message">تم إرسال الفيدباك بنجاح!</p>`;

      // إعادة تعيين الحقول
      document.getElementById("name-input").value = "";
      document.getElementById("feedback-input").value = "";

      // إزالة الرسالة بعد 5 ثواني
      setTimeout(() => {
        feedbackMessage.innerHTML = "";
      }, 5000);

      console.log("إعادة تحميل التعليقات...");
      await loadFeedback(); // تأكد من أن التعليقات تُجلب بعد الإرسال مباشرة
    } catch (error) {
      console.error("خطأ أثناء إرسال الفيدباك:", error);
      feedbackMessage.innerHTML = `<p class="error-message">حدث خطأ أثناء إرسال الفيدباك. حاول مرة أخرى.</p>`;
    }
  } else {
    feedbackMessage.innerHTML = `<p class="error-message">يرجى إدخال الاسم والفيدباك قبل الإرسال.</p>`;
  }
}

// جعل الدالة متاحة في النموذج
window.submitFeedback = submitFeedback;

// دالة تحميل الفيدباك من قاعدة البيانات
async function loadFeedback() {
  const feedbackContainer = document.getElementById("feedback-container");
  feedbackContainer.innerHTML = "";
  console.log("جلب التعليقات من Firestore...");

  try {
    const querySnapshot = await getDocs(collection(db, "feedback"));
    if (querySnapshot.empty) {
      console.log("لا توجد تعليقات بعد.");
      feedbackContainer.innerHTML = "<p class='info-message'>لا توجد تعليقات حتى الآن.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const feedbackData = doc.data();
      console.log("تم العثور على تعليق:", feedbackData);

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
    console.error("خطأ أثناء تحميل الفيدباك:", error);
    alert("حدث خطأ أثناء تحميل الفيدباك.");
  }
}

// تحميل التعليقات عند فتح الصفحة
window.onload = loadFeedback;
