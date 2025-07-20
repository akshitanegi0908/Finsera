// Quiz Data
const quizData = [
  {
    question: "Which of these is a smart spending habit?",
    options: [
      { text: "Buying things on impulse", correct: false },
      { text: "Tracking daily expenses", correct: true },
      { text: "Ignoring budgets", correct: false },
      { text: "Using credit for everything", correct: false },
    ],
  },
  {
    question: "What should you do before making a big purchase?",
    options: [
      { text: "Check your budget", correct: true },
      { text: "Swipe your card immediately", correct: false },
      { text: "Borrow from a friend", correct: false },
      { text: "Ignore and buy again", correct: false },
    ],
  },
  {
    question: "How can you build savings effectively?",
    options: [
      { text: "Spend first, save later", correct: false },
      { text: "Save whatever is left", correct: false },
      { text: "Auto-save a fixed % monthly", correct: true },
      { text: "Wait for bonuses to save", correct: false },
    ],
  },
];

// DOM Elements
const takeQuiz = document.getElementById("takeQuiz");
const quizPopupBox = document.getElementById("quizPopup");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const closeQuizBtn = document.getElementById("closeQuizPopup");

let currentQuestion = 0;
let score = 0;

// Show Quiz on Button Click
takeQuiz.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  showQuestion();
  quizPopupBox.classList.remove("hidden");

  // Show Starting Popup
  const quizStartPopup = document.getElementById("quizStartPopup");
  quizStartPopup.classList.remove("hidden");
  setTimeout(() => {
    quizStartPopup.classList.add("hidden");
  }, 2000);
});

// Close Quiz Popup
closeQuizBtn.addEventListener("click", () => {
  quizPopupBox.classList.add("hidden");
});

// Show a Question
function showQuestion() {
  const q = quizData[currentQuestion];
  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className =
      "quiz-option w-full px-3 py-2 bg-purple-100 rounded-md text-left hover:bg-purple-200";
    btn.textContent = opt.text;

  btn.addEventListener("click", () => {
  // Disable all buttons after one click
  const allButtons = quizOptions.querySelectorAll("button");
  allButtons.forEach((b) => (b.disabled = true));

  if (opt.correct) {
    score += 40;
    showPopup("✅ Correct!", "You gained +40 XP");
  } else {
    score -= 30;
    showPopup("❌ Incorrect!", "That was Wrong ");
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      quizPopupBox.classList.add("hidden");
      if (score > 0) {
        showCongratsPopup(score);
      }
      // else do nothing or show a different message if you want
    }
  }, 1500);
});


    quizOptions.appendChild(btn);
  });
}

// 🎉 Final XP Congrats Popup
function showCongratsPopup(score) {
  const popup = document.createElement("div");
  popup.className =
    "fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]";
  popup.innerHTML = `
    <div class="relative bg-white rounded-2xl p-6 w-80 shadow-2xl text-center overflow-hidden animate-scaleIn">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 opacity-10 animate-pulse"></div>
      <h2 class="text-2xl font-bold text-purple-700 relative z-10">🎉 Congrats!</h2>
      <p class="mt-2 text-sm text-purple-600 relative z-10">You earned <strong>${score} XP</strong></p>
      <div class="mt-4 relative z-10">
        <button id="closeCongrats" class="mt-2 bg-purple-700 text-white px-4 py-2 rounded-full font-semibold">Close</button>
      </div>
      <div class="absolute w-full h-full top-0 left-0 overflow-hidden z-0">
        ${Array(15)
          .fill(0)
          .map(
            (_, i) =>
              `<div class="absolute bg-purple-400 rounded-full opacity-30 animate-bubble" style="width:${5 +
                i}px; height:${5 + i}px; left:${Math.random() *
                100}%; animation-delay:${i * 0.2}s; bottom:-20px;"></div>`
          )
          .join("")}
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("closeCongrats").addEventListener("click", () => {
    popup.remove();
  });
}

// Generic Popup Utility
function showPopup(title, message) {
  const popup = document.createElement("div");
  popup.className =
    "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]";

  popup.innerHTML = `
    <div class="relative bg-white rounded-xl p-6 w-80 shadow-2xl text-center animate-scaleIn">
      <button class="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold" id="popupClose">&times;</button>
      <h2 class="text-xl font-bold text-purple-700 mb-2">${title}</h2>
      <p class="text-sm text-gray-700 leading-relaxed">${message}</p>
    </div>
  `;

  document.body.appendChild(popup);

  document.getElementById("popupClose").addEventListener("click", () => {
    popup.remove();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button").forEach((btn) => {
    const label = btn.innerText.trim().toUpperCase();

    if (label === "SETUP GOAL") {
      btn.addEventListener("click", () => {
        showPopup(
          "🎯 Setup Goal",
          "Set a weekly or monthly saving goal to start building better financial habits. Start small — even ₹500/month makes a difference!"
        );
      });
    }

    if (label === "VIEW STATUS") {
      btn.addEventListener("click", () => {
        showPopup(
          "📊 Loan Status",
          "You're crushing it! ₹5,678 paid this year 💸. Keep up the consistency — you're on track to being debt-free!"
        );
      });
    }

    if (label === "VIEW GOAL") {
      btn.addEventListener("click", () => {
        showPopup(
          "🏖️ Goa Trip Progress",
          "You've saved ₹12,000 so far out of ₹20,000. You're just ₹8,000 away from that sunset beach and coconut vibes. Keep going!"
        );
      });
    }

    if (label === "VIEW SPENDING") {
      btn.addEventListener("click", () => {
        showPopup(
          "💡 Smart Spending Tip",
          "You made 42 small purchases under ₹50 last month. Tracking these can significantly boost your savings!"
        );
      });
    }
  });
});
