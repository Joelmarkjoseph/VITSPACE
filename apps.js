import { GoogleGenerativeAI } from "@google/generative-ai";

document.addEventListener('DOMContentLoaded', function() {
  const mydata = `Born on Dec 17, 2004, I began my journey in Bitragunta...
    // Your long text here
    Won Prizes in Singing Competitions.`;

  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const video = document.getElementById("videoPlayer");
  
  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'en-US'; // Set language to US English
  utterance.rate = 1.3; // Speaking rate

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    input.value = "";

    runModel(message);
  });

  async function runModel(prompt = "") {
    try {
      const API_KEY = "AIzaSyA2VqV1q-P4QQOcYcm1AdWPJka6CxViAaw";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt + " (answer with little short message but don't use any emojis and also remember that your name is JOEL)");
      const response = result.response.text();
        console.log(response);
      speak(response);
      playVideoContinuously();
    } catch (error) {
      console.error('Error generating content:', error);
      // Display error to the user or handle it appropriately
    }
  }

  function speak(inputText) {
    utterance.text = inputText;
    speechSynthesis.speak(utterance);

    utterance.addEventListener('end', function() {
      video.pause();
      video.currentTime = 0;
    });
  }

  function playVideoContinuously() {
    video.currentTime = 0;

    video.addEventListener('ended', function() {
      video.currentTime = 0;
      video.play();
    });

    video.play();
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }
  document.getElementById("listenn").onclick = function() {
    startListening();
  };
    function startListening() {
    document.getElementById("micc").style.padding = "10px";
    document.getElementById("micc").style.borderRadius = "10px";
    document.getElementById("micc").style.backgroundColor = "red";
    document.getElementById("chat-input").value = "Listening..........";
    const recognition =
      new webkitSpeechRecognition() || new SpeechRecognition();

    recognition.lang = "en-US"; 

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById("chat-input").value = transcript;
    };

    recognition.onerror = function (event) {
      console.error("Speech recognition error detected: " + event.error);
    };

    recognition.onend = function () {
      console.log("Speech recognition ended.");
      document.getElementById("chat-input").focus();
      document.getElementById("btnn").click();
      document.getElementById("micc").style.backgroundColor = "white";
      document.getElementById("micc").style.padding = "0px";
    };

    recognition.start();
  }
});