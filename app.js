import { GoogleGenerativeAI } from "@google/generative-ai";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const video = document.getElementById("videoPlayer");
  const audio = document.getElementById("audioPlayer");

  // Initialize speech synthesis
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'en-US'; // Set language to US English
  utterance.rate = 1.3; // Speaking rate

  // Event listener for form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim(); // Trim whitespace
    input.value = "";

    // Display user message
    displayMessage("user", message);
    scrollToBottom();

    // Generate response and speak
    runModel(message);
  });

  // Function to generate response and speak
  async function runModel(prompt = "") {
    try {
      const API_KEY = "AIzaSyA2VqV1q-P4QQOcYcm1AdWPJka6CxViAaw"; // Replace with your actual API key
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate content using the model
      const result = await model.generateContent(prompt + " (answer with little short message or any emojis and also remember that your name is BUJJI)");
      const response = result.response.text();

      // Display bot message
      displayMessageans("bot", prompt, response);

      // Speak the response and play video concurrently
      speak(response);
      playVideoContinuously();
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }

  // Function to display messages in the chat
  function displayMessage(sender, message) {
    const className = (sender === "user") ? "user-message" : "bot-message";
    const icon = (sender === "user") ? "./user.png" : "./bujji.png";
    messages.innerHTML += `
      <div class="message ${className}">
        <img src="${icon}" alt="${sender} icon"> <span>${message}</span>
      </div>
    `;
  }

  // Function to display bot messages
  function displayMessageans(sender, message, response) {
    const className = (sender === "user") ? "user-message" : "bot-message";
    const icon = (sender === "user") ? "./user.png" : "./bujji.png";

    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('message', className);
    botMessageElement.innerHTML = `
      <img src="${icon}" alt="${sender} icon"> <span>${sender !== "user" ? "" : response}</span>
    `;
    messages.appendChild(botMessageElement);

    // Animate text letter by letter
    animateText(response, botMessageElement.querySelector('span'));
  }

  // Function to animate text letter by letter
  function animateText(text, element) {
    let index = 0;
    const intervalId = setInterval(() => {
      element.textContent += text[index];
      scrollToBottom();
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 50); // Adjust delay time as needed (50ms per character)
  }

  // Function to speak the text
  function speak(inputText) {
    utterance.text = inputText;
    speechSynthesis.speak(utterance);

    // Event listener for when speech ends
    utterance.addEventListener('end', function() {
      // Pause video playback when speech ends
      video.pause();
      // Reset video to start from the beginning
      video.currentTime = 0;
    });
  }

  // Function to scroll to the bottom of the chat messages
  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }
});
