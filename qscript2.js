const answers = {
    q1: "Confidentiality, Integrity and Availability",
    q2: "Policy",
    q3: "Identification",
    q4: "False",
    q5: "All the above",
    q6: "Authorization",
    q7: "All the above",
    q8: "Accountability",
    q9: "All of the above",
    q10: "All the above"
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
