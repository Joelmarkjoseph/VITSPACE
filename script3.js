const answers = {
    q1: "Strategic Planning",
    q2: "GRC integrates cybersecurity within ERM",
    q3: "Information Security Policy",
    q4: "Standard Driven Approach",
    q5: "All the above",
    q6: "Assess IT governance processes",
    q7: "Risk identification and assessment",
    q8: "Operate at enterprise level",
    q9: "Concerns about effectiveness",
    q10: "Maximize trusted system elements"
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
