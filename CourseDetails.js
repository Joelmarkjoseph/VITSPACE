document.addEventListener('DOMContentLoaded', () => {
  // Attach any future dynamic behavior for course pages safely
  const registerButtons = document.querySelectorAll('.register-button');
  registerButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // Allow default navigation; noop placeholder ensures file exists
    });
  });
});
