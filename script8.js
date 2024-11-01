document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let score=0;
    const answers = {
        q1: 'CBA = ALE(prior) - ALE(post) + ACS',
        q2: 'Single Loss Expectancy',
        q3: 'Firewall',
        q4: 'Mitigation risk control strategy',
        q5: 'Single Loss Expectancy',
        q6: 'Bit Stream Cipher can operate as a Block Cipher but Block Cipher cannot operate as a Bit Stream Cipher',
        q7: 'The system mistakenly accepting an unauthorized user.',
        q8: 'Identification, Authentication, Authorization, Accountability',
        q9: 'Key management: securely distributing and safeguarding the shared key.',
        q10: 'Both A and B'
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
