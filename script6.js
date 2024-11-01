document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {
        q1: 'Risk assessment',
        q2: 'Residual risk',
        q3: 'Determine loss frequency',
        q4: 'Loss frequency',
        q5: 'Dumpster diving',
        q6: 'Identifying risks, assessing risk, and controlling risks.',
        q7: 'The relationship between various types of threats and the organization\'s assets.',
        q8: 'People, Procedures, Data and information, Software, Hardware, and Networking elements',
        q9: 'Risk = Loss frequency x Loss magnitude + Measurement Uncertainty',
        q10: '1.296',
    };

    for (let i = 1; i <= 10; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback-q${i}`);
        
        if (selected) {
            if (selected.value === answers[`q${i}`]) {
                feedbackDiv.textContent = 'Correct!';
                feedbackDiv.style.color = 'green';
            } else {
                feedbackDiv.textContent = 'Incorrect. Correct answer: ' + answers[`q${i}`];
                feedbackDiv.style.color = 'red';
            }
        } else {
            feedbackDiv.textContent = 'Please select an answer.';
            feedbackDiv.style.color = 'red';
        }
    }
});
