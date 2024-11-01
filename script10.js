
document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let score=0;
    const answers = {
        q1: "The discrepancy between the expressed concern and the actual behavior of users when it comes to privacy in an online environment.",
        q2: "None of the above",
        q3: "None of the above",
        q4: "Confidentiality",
        q5: "All the above",
        q6: "EU Data Protection Directive",
        q7: "Fair Information Practice Principles",
        q8: "Identifiers can uniquely identify an individual, while quasi-identifiers cannot on their own.",
        q9: "Suppression and generalization",
        q10: "Maximizing data usefulness while maintaining acceptable privacy risks."
    };

    for (const [question, correctAnswer] of Object.entries(answers)) {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        const feedbackElement = document.getElementById(`feedback-${question}`);

        if (userAnswer) {
            const userValue = userAnswer.value;
            if (userValue === correctAnswer) {
                feedbackElement.textContent = 'Correct!';
                feedbackElement.className = 'feedback correct';
            } else {
                feedbackElement.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
                feedbackElement.className = 'feedback incorrect';
            }
        } else {
            feedbackElement.textContent = 'Please select an answer.';
            feedbackElement.className = 'feedback incorrect';
        }
    }
});
