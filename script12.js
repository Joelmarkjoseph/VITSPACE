
document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {
        q1: 'To help businesses develop privacy-enhancing initiatives that can provide a competitive advantage',
        q2: 'Privacy valuation can differ based on the specific context and circumstances',
        q3: 'Individuals engage in a cost-benefit analysis to decide whether to disclose personal data',
        q4: 'True',
        q5: 'Develop a decentralized, privacy-preserving architecture that minimizes the sharing of personal data',
        q6: 'Losses are typically felt more intensely than gains.',
        q7: 'All the above',
        q8: '(1) and (2) are True',
        q9: 'Data Principal',
        q10: 'To ensure that only necessary data is collected and processed'
    };
    
    let score = 0;
    let totalQuestions = Object.keys(answers).length;

    for (let q in answers) {
        let selectedOption = document.querySelector(`input[name="${q}"]:checked`);
        let feedbackElement = document.getElementById(`feedback-${q}`);
        if (selectedOption) {
            if (selectedOption.value === answers[q]) {
                score++;
                feedbackElement.textContent = "Yes, the answer is correct.";
                feedbackElement.style.color = "green";
            } else {
                feedbackElement.textContent = "Incorrect. The correct answer is: " + answers[q];
                feedbackElement.style.color = "red";
            }
        } else {
            feedbackElement.textContent = "Please select an answer.";
            feedbackElement.style.color = "orange";
        }
    }

    const resultElement = document.getElementById('result');
    resultElement.textContent = `Your score: ${score} out of ${totalQuestions}`;
});
