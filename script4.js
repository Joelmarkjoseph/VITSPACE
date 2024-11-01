const answers = {
    q1: "Cold site",
    q2: "Work Recovery Time",
    q3: "All the above",
    q4: "Business impact analysis",
    q5: "Business continuity planning",
    q6: "Operational Planning",
    q7: "All the above",
    q8: "Business Processes",
    q9: "Activities at unexpected times",
    q10: "To review and improve the effectiveness of the IRP"
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
