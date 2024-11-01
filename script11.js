document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {
        q1: 'Both A and B',
        q2: 'False',
        q3: '2000',
        q4: 'True',
        q5: 'All the above',
        q6: 'May 25, 2018',
        q7: 'Vital interests',
        q8: '72 hours',
        q9: 'When there is significant processing of personal data, sensitive data on a large scale',
        q10: 'False'
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
