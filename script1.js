const answers = {
    q1: "Spear Phishing",
    q2: "Ransomware",
    q3: "All of the above",
    q4: "Process",
    q5: "Network Security",
    q6: "Technology plays a triple role: source of threats, asset to protect, and defense weapon",
    q7: "Social Engineering",
    q8: "False",
    q9: "All the above",
    q10: "False"
};

function submitQuiz() {
    const form = document.getElementById("quiz-form");
    let score = 0;

    Object.keys(answers).forEach((questionId) => {
        const userAnswer = form[questionId].value;
        const feedbackElement = document.getElementById(`feedback-${questionId}`);

        if (userAnswer === answers[questionId]) {
            score += 1;
            feedbackElement.textContent = "Correct!";
            feedbackElement.className = "feedback correct";
        } else {
            feedbackElement.textContent = `Wrong! The correct answer is: ${answers[questionId]}`;
            feedbackElement.className = "feedback wrong";
        }
    });

    document.getElementById("result").innerHTML = `Your score: ${score} / ${Object.keys(answers).length}`;
}
