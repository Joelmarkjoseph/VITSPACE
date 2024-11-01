const answers = {
    q1: "Establish a comprehensive reference point for organizational cybersecurity practices.",
    q2: "Enterprise information security policy (EISP)",
    q3: "False",
    q4: "Enterprise > Issue-Specific > Systems-Specific",
    q5: "Statement of purpose",
    q6: "True",
    q7: "Access Control Lists",
    q8: "True",
    q9: "Guidelines",
    q10: "Segmenting networks for improved security"
};

function submitQuiz() {
    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    for (let question in answers) {
        const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback-${question}`);
        
        if (selectedAnswer) {
            if (selectedAnswer.value === answers[question]) {
                feedbackDiv.textContent = "Correct!";
                feedbackDiv.className = "feedback correct";
                score++;
            } else {
                feedbackDiv.textContent = "Wrong! The correct answer is: " + answers[question];
                feedbackDiv.className = "feedback wrong";
            }
        } else {
            feedbackDiv.textContent = "You didn't answer this question.";
            feedbackDiv.className = "feedback wrong";
        }
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h2>Your Score: ${score} out of ${totalQuestions}</h2>`;
}
