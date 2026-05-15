const testButtons = document.getElementById("testButtons");
const quizSection = document.getElementById("quiz-section");
const quizForm = document.getElementById("quizForm");
const quizTitle = document.getElementById("quizTitle");
const submitBtn = document.getElementById("submitBtn");
const backBtn = document.getElementById("backBtn");
const resultBox = document.getElementById("result");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let dataset = [];
let currentTest = null;

fetch("data/questions.json")
  .then((res) => res.json())
  .then((data) => {
    dataset = data.tests || [];
    renderTestButtons();
  })
  .catch(() => {
    testButtons.innerHTML = "<p>Không tải được dữ liệu câu hỏi. Vui lòng kiểm tra file data/questions.json</p>";
  });

function renderTestButtons() {
  testButtons.innerHTML = "";
  dataset.forEach((test) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.type = "button";
    btn.textContent = test.name;
    btn.addEventListener("click", () => startTest(test.id));
    testButtons.appendChild(btn);
  });
}

function startTest(testId) {
  currentTest = dataset.find((t) => t.id === testId);
  if (!currentTest) return;

  quizTitle.textContent = `Bài test: ${currentTest.name}`;
  quizForm.innerHTML = "";
  resultBox.classList.add("hidden");
  resultBox.innerHTML = "";

  currentTest.questions.forEach((q, index) => {
    const wrap = document.createElement("div");
    wrap.className = "question";
    wrap.innerHTML = `<h3>Câu ${index + 1}: ${q.question}</h3>`;

    const options = document.createElement("div");
    options.className = "options";

    q.options.forEach((opt, optIndex) => {
      const id = `q${index}_opt${optIndex}`;
      const line = document.createElement("label");
      line.innerHTML = `<input type="radio" name="q${index}" value="${optIndex}" /> ${opt}`;
      line.setAttribute("for", id);
      options.appendChild(line);
    });

    wrap.appendChild(options);
    quizForm.appendChild(wrap);
  });

  quizSection.classList.remove("hidden");
  updateProgress();
  window.scrollTo({ top: quizSection.offsetTop - 12, behavior: "smooth" });

  quizForm.querySelectorAll("input[type='radio']").forEach((radio) => {
    radio.addEventListener("change", updateProgress);
  });
}

function updateProgress() {
  if (!currentTest) return;
  const total = currentTest.questions.length;
  const answered = quizForm.querySelectorAll("input[type='radio']:checked").length;
  const pct = total ? (answered / total) * 100 : 0;
  progressBar.style.width = `${pct}%`;
  progressText.textContent = `${answered}/${total} câu`;
}

function classify(score) {
  if (score < 60) return "Trainee";
  if (score < 75) return "Operator";
  if (score < 85) return "Controller";
  if (score < 95) return "Risk Hunter";
  return "Control Leader";
}

submitBtn.addEventListener("click", () => {
  if (!currentTest) return;

  let correct = 0;
  const total = currentTest.questions.length;

  currentTest.questions.forEach((q, index) => {
    const selected = quizForm.querySelector(`input[name='q${index}']:checked`);
    if (selected && Number(selected.value) === q.answer) correct += 1;
  });

  const score = Math.round((correct / total) * 100);
  const level = classify(score);

  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <p class="score">Điểm: ${score}/100</p>
    <p>Số câu đúng: ${correct}/${total}</p>
    <p>Xếp loại: <strong>${level}</strong></p>
    <p><em>Lưu ý: Đây là dữ liệu mẫu, không phải dữ liệu nghiệp vụ thực tế.</em></p>
  `;

  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
});

backBtn.addEventListener("click", () => {
  quizSection.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
