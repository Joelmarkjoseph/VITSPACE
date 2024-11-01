document.getElementById('submit-btn').addEventListener('click', function() {
    let score = 0;

    const answers = {
        q1: 'Public key infrastructure',
        q2: 'Ring 0',
        q3: 'Hashing functions require the use of keys.',
        q4: 'Private key encryption',
        q5: 'Both a and c.',
        q6: 'All the above.',
        q7: 'Protecting individual user devices from threats.',
        q8: 'Silently using the victim\'s processing power to solve complex mathematical problems for financial reward.',
        q9: 'Critical infrastructure essential for national security (e.g., power grids, communication networks).',
        q10: 'Cleanup'
    };

    for (let q in answers) {
        const selectedOption = document.querySelector(`input[name="${q}"]:checked`);
        const feedback = document.getElementById(`feedback-${q}`);
        if (selectedOption) {
            if (selectedOption.value === answers[q]) {
                score++;
                feedback.textContent = 'Correct!';
                feedback.style.color = 'green';
            } else {
                feedback.textContent = 'Incorrect. The correct answer is: ' + answers[q];
                feedback.style.color = 'red';
            }
        } else {
            feedback.textContent = 'Please select an answer.';
            feedback.style.color = 'orange';
        }
    }

    document.getElementById('result').textContent = `Your score: ${score} out of ${Object.keys(answers).length}`;
});
