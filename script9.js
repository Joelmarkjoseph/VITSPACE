document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let score = 0;
    const feedbackMessages = {
        q1: "Blockchains are implemented as queues.",
        q2: "Block size: 64 bits, key size: 56 bits",
        q3: "To encrypt messages using a public key and decrypt them using a private key",
        q4: "Nonrepudiation",
        q5: "Its uniqueness or proximity to a specific individual.",
        q6: "Alan Westin",
        q7: "The ability of individuals to decide what personal information they share and with whom.",
        q8: "The US Secretary's Advisory Committee on Automated Personal Data Systems.",
        q9: "The right to be forgotten",
        q10: "Privacy is seen as a derivative right, stemming from other fundamental rights like property or bodily security."
    };

    for (let i = 1; i <= 10; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback-q${i}`);
        if (selectedAnswer) {
            const answer = selectedAnswer.value;
            const correctAnswer = feedbackMessages[`q${i}`];
            if (answer === correctAnswer) {
                score++;
                feedbackDiv.innerText = "Yes, the answer is correct.";
                feedbackDiv.style.color = "green";
            } else {
                feedbackDiv.innerText = `Incorrect. The correct answer is: ${correctAnswer}.`;
                feedbackDiv.style.color = "red";
            }
        }
    }

    document.getElementById("result").innerText = `Your score: ${score} out of 10`;
});
