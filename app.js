import { GoogleGenerativeAI } from "@google/generative-ai";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  // const audio = document.getElementById("audioPlayer");

  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'en-US';
  utterance.rate = 1.3;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    input.value = "";

    displayMessage("user", message);
    scrollToBottom();

    runModel(message);
  });

  async function runModel(prompt = "") {
    try {
      const API_KEY = "AAIzaSyA81Y-SeNjO4euqcDO9Nb49hBaNR1xiq5I";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt + " (remember that your name is BUJJI)");
      const response = result.response.text();

      displayMessageans("bot", response);
      speak(response);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  }

  function displayMessage(sender, message) {
    const className = (sender === "user") ? "user-message" : "bot-message";
    const icon = (sender === "user") ? "./user.png" : "./bujji.png";
    messages.innerHTML += `
      <div class="message ${className}"> 
        <img src="${icon}" alt="${sender} icon"> <span>${message}</span>
      </div>
    `;
  }

  function displayMessageans(sender, response) {
    const className = "bot-message";
    const icon = "./bujji.png";

    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('message', className);
    botMessageElement.innerHTML = `
      <img src="${icon}" alt="${sender} icon"> <span></span>
    `;
    messages.appendChild(botMessageElement);

    animateText(response, botMessageElement.querySelector('span'));
  }

  function animateText(text, element) {
    let index = 0;
    const intervalId = setInterval(() => {
      element.textContent += text[index];
      scrollToBottom();
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 50);
  }

  function speak(inputText) {
    utterance.text = inputText;
    speechSynthesis.speak(utterance);
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }
});