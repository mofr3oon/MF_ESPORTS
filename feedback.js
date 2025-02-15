import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_g6NUkE0T2Bh54dbZP-n-h-ub8otlFI",
  authDomain: "pubgscream-d4a35.firebaseapp.com",
  projectId: "pubgscream-d4a35",
  storageBucket: "pubgscream-d4a35.firebasestorage.app",
  messagingSenderId: "320274957822",
  appId: "1:320274957822:web:d6b66b4632022ffdf4acaf",
  measurementId: "G-04104VRVJF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function submitFeedback() {
  const nameInput = document.getElementById("name-input").value;
  const feedbackInput = document.getElementById("feedback-input").value;
  const feedbackMessage = document.getElementById("feedback-message");

  if (nameInput && feedbackInput) {
    try {
      await addDoc(collection(db, "feedback"), { name: nameInput, comment: feedbackInput });
      feedbackMessage.innerHTML = `<p class="success-message">تم إرسال الفيد باك بنجاح!</p>`;
      document.getElementById("name-input").value = "";
      document.getElementById("feedback-input").value = "";

      // إزالة الرسالة بعد 5 ثواني
      setTimeout(() => {
        feedbackMessage.innerHTML = "";
      }, 5000);

      loadFeedback();
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      feedbackMessage.innerHTML = `<p class="error-message">حدث خطأ أثناء إرسال الفيد باك. حاول مرة أخرى.</p>`;
    }
  } else {
    feedbackMessage.innerHTML = `<p class="error-message">يرجى إدخال الاسم والفيد باك قبل الإرسال.</p>`;
  }
}

window.submitFeedback = submitFeedback;

async function loadFeedback() {
  const feedbackContainer = document.getElementById("feedback-container");
  feedbackContainer.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "feedback"));
    querySnapshot.forEach((doc) => {
      const feedbackData = doc.data();
      const feedbackElement = document.createElement("div");
      feedbackElement.className = "feedback-item";
      feedbackElement.innerHTML = `<strong>${feedbackData.name}:</strong> ${feedbackData.comment}`;
      feedbackContainer.appendChild(feedbackElement);
    });
  } catch (error) {
    console.error("Error loading feedback: ", error);
    alert("حدث خطأ أثناء تحميل الفيد باك.");
  }
}

window.onload = loadFeedback;
