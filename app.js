const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "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";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message">
  <img src="./user.png" alt="user icon"> <span>${message}</span>
  </div>`;
  var yes=0;
  const exmpls = ["Hello", "hi", "Who Are you","hlo","helo","how are u","Who r u","i love u","I love you","Namaste","hola","What are you","wat r u","what are u?","What r you"];
  for (let i = 0; i < exmpls.length; i++) {
    if(message.toUpperCase() == exmpls[i].toUpperCase()){
      chatbotResponse="Hello! I'm Vitspace-Bot. How can i help you today?";
      yes=1;
      break;
    }
  }
  if(yes==0){
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: message,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  chatbotResponse = response.data.choices[0].text;
  }
  var str_pos0 = message.indexOf("code");
  var str_pos1 = message.indexOf("Code");
  var str_pos2 = message.indexOf("program");
  var str_pos3 = message.indexOf("Program");
  var str_pos4 = message.indexOf("letter");
  var str_pos5 = message.indexOf("Letter");

  if (str_pos0 > -1||str_pos2 > -1||str_pos3 > -1||str_pos4 > -1||str_pos5 > -1||str_pos1 > -1) {
    console.log("The specific word exists");
    messages.innerHTML += `<div class="message bot-message">
  <img src="./chatbot.png" alt="bot icon"> <span><pre id="precode">${chatbotResponse}</pre></span>
  </div>`;
  
  } else {
    messages.innerHTML += `<div class="message bot-message">
  <img src="./chatbot.png" alt="bot icon"> <span>${chatbotResponse}</span>
  </div>`;
  }

  
});
