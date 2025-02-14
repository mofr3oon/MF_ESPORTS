document.addEventListener('DOMContentLoaded', loadFeedback);

function loadFeedback() {
  fetch('feedback.json')
    .then(response => response.json())
    .then(feedback => {
      displayFeedback(feedback);
    });
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
