// Set the date we're counting down to
const registrationDeadline = new Date("Jul 21, 2024 17:59:59").getTime();

// Update the countdown every second
const countdownInterval = setInterval(() => {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the registration deadline
    const distance = registrationDeadline - now;
    
    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in the respective elements
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
    
    // If the countdown is over, display some text
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "Registration Closed";
    }
}, 1000);
