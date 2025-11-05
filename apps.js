import { GoogleGenerativeAI } from "@google/generative-ai";

document.addEventListener('DOMContentLoaded', function() {
  const mydata = `Born on Dec 17, 2004, I began my journey in Bitragunta...
    // Your long text here
    Won Prizes in Singing Competitions.`;

  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const videoElement =
    document.getElementById("videoPlayer") ||
    document.getElementById("myvideo") ||
    document.querySelector("video") ||
    null;

  const utterance = new SpeechSynthesisUtterance();
  utterance.lang = "en-US";
  utterance.rate = 1.3;

  function chooseVoice() {
    if (!("speechSynthesis" in window)) {
      return;
    }
    const availableVoices = window.speechSynthesis.getVoices();
    const englishVoices = availableVoices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("en"));
    const preferredVoice =
      englishVoices.find((v) => /google|microsoft|samantha|alex/i.test(v.name)) ||
      englishVoices[0] ||
      availableVoices[0] ||
      null;
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  }

  if ("speechSynthesis" in window) {
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", chooseVoice, { once: true });
    }
    chooseVoice();
  }

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
      const result = await model.generateContent(prompt + " (answer with little short message but don't use any unicodes and also remember that your name is ROSEY)");
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
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    });
  }

  function playVideoContinuously() {
    if (!videoElement) {
      return;
    }
    videoElement.currentTime = 0;

    videoElement.addEventListener('ended', function() {
      videoElement.currentTime = 0;
      videoElement.play();
    });

    videoElement.play();
  }

  function scrollToBottom() {
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  }
  const listenButton = document.getElementById("listenn");
  if (listenButton) {
    listenButton.onclick = function () {
      startListening();
    };
  }
    function startListening() {
    document.getElementById("micc").style.padding = "10px";
    document.getElementById("micc").style.borderRadius = "10px";
    document.getElementById("micc").style.backgroundColor = "red";
    document.getElementById("chat-input").value = "Listening..........";
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();

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