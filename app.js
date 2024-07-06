// Import GoogleGenerativeAI from the module
import { GoogleGenerativeAI } from "@google/generative-ai";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  
  // Fetch your API_KEY (replace with your actual API key)
  const API_KEY = "AIzaSyA2VqV1q-P4QQOcYcm1AdWPJka6CxViAaw";

  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Define your generative model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Event listener for form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim(); // Trim whitespace
    input.value = "";

    // Display user message
    displayMessage("user", message);
    scrollToBottom();
    runModel(message); 
    
  });

  // Function to generate content using the model
  async function runModel(prompt = "") {
    model.generateContent(prompt)
      .then(result => {
        const response = result.response;
        const text = response.text();
        console.log(text);
        displayMessageans("bot", prompt, text); 
      })
      .catch(error => {
        console.error('Error generating content:', error);
      });
  }

  // Function to display messages in the chat
  function displayMessage(sender, message) {
    const className = (sender === "user") ? "user-message" : "bot-message";
    const icon = (sender === "user") ? "./user.png" : "./chatbot.png";
    messages.innerHTML += `
      <div class="message ${className}">
        <img src="${icon}" alt="${sender} icon"> <span>${message}</span>
      </div>
    `;
  }

  // Function to display messages in the chat letter by letter
  function displayMessageans(sender, message, response) {
    const className = (sender === "user") ? "user-message" : "bot-message";
    const icon = (sender === "user") ? "./user.png" : "./chatbot.png";

    // Check for specific words
    const str_pos0 = message.toLowerCase().indexOf("code") > -1;
    const str_pos1 = message.toLowerCase().indexOf("program") > -1;
    const str_pos2 = message.toLowerCase().indexOf("letter") > -1;

    // Create a new message element for the bot's response
    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('message', className);

    // Add bot icon and append to messages container
    if (str_pos0 || str_pos1 || str_pos2) {
      console.log("The specific word exists");

      // Format response with bold tags
      botMessageElement.innerHTML = `
        <img src="${icon}" alt="${sender} icon"> <span><pre id="precode">${("")}</pre></span>
      `;
      messages.appendChild(botMessageElement);

    // Function to animate text
    animateText(response, botMessageElement.querySelector('pre'));
    // botMessageElement.querySelector('pre').textContent=formatTextWithBold(response);
    } else {
      botMessageElement.innerHTML = `
        <img src="${icon}" alt="${sender} icon"> <span>${("")}</span>
        
      `;
      messages.appendChild(botMessageElement);

    // Function to animate text
    animateText((response), botMessageElement.querySelector('span'));
    speak(response);
    }

    
  }

  // Function to animate text letter by letter
  function animateText(text, element) {
    let index = 0;
    const intervalId = setInterval(() => {
      element.textContent += text[index];
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
        scrollToBottom();
      }
    }, 10); // Adjust delay time as needed (50ms per character)
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function formatTextWithBold(inputText) {
    // Regular expression to find **bold** patterns
    const boldRegex = /\*\*(.*?)\*\*/g;

    // Replace **bold** with <strong>bold</strong> and remove **, `, and "
    let formattedText = inputText.replace(boldRegex, '<strong>$1</strong>').replace(/(\*\*|`|")/g, '');

    // Remove all single quotes
    formattedText = formattedText.replace(/'/g, '');

    return formattedText;
  }

  function speak(inputText) {
    
    const utterance = new SpeechSynthesisUtterance(inputText);
    
    // Optionally set properties such as language, pitch, rate, etc.
    utterance.lang = 'en-US'; // Set language to US English
    utterance.rate = 1.5; // Speaking rate
    
    // Speak the text
    speechSynthesis.speak(utterance);
  }

 
});
