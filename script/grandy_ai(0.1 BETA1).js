function commandSended() {
  const messageInput = document.getElementById("message");
  if (messageInput.value.toLowerCase() === "offline") {
    console.log("sistem sedang offline");
  }
}

let systemName;
let systemDefaultLanguage;
let systemType;
let systemStatus;
let fetchDirectory;

fetch("system.json")
  .then(response => response.json())
  .then(data => {
    systemName = data.system.name[0];
    systemDefaultLanguage = data.system.default_language[0];
    systemType = data.system.type[0];
    systemStatus = data.system.status && data.system.status[0];
  })
  .catch(error => {
    console.log("system error", error);
  });

let running = systemStatus;

fetch("messages.json")
  .then(response => response.json())
  .then(data => {
    const messages = data;

    const chatbox = document.getElementById("chatbox");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");

    sendButton.addEventListener("click", () => {
      const userMessage = messageInput.value.replace(/\n/g, '<br>').toLowerCase();
      messageInput.value = "";

      let response = "Sorry, I don't understand that yet. Can you rephrase?";
      for (const key in messages) {
        if (messages[key].match.some(match => userMessage.includes(match))) {
          response = messages[key].response[Math.floor(Math.random() * messages[key].response.length)];
          const name = document.getElementById("name");
          const question = document.getElementById("question");
          
          name.style.fontSize = "0px";
          question.style.fontSize = "0px";
          messageInput.style.height = "31px";
          break;
        }
      }

      var youBox = document.createElement("div");
      chatbox.appendChild(youBox);
      var you = document.createElement("p");
      you.innerHTML = userMessage;
      youBox.appendChild(you);
      // you.style.textAlign = "left";
      youBox.style.marginTop = "2.5px";
      youBox.style.marginBottom = "2.5px";
      youBox.style.backgroundColor = "#0bace8";
      you.style.color = "white";
      youBox.style.borderRadius = "5px";
      you.style.margin = "5px 5px 5px 5px";
      you.style.padding = "5px";

      var aiBox = document.createElement("div");
      chatbox.appendChild(aiBox);
      
      var ai = document.createElement("p");
      ai.innerHTML = response;
      aiBox.appendChild(ai);
      aiBox.style.overflow = "auto";
      aiBox.style.backgroundColor = "#08b931";
      aiBox.style.color = "white";
      aiBox.style.borderRadius = "5px";
      aiBox.style.marginTop = "2.5px";
      aiBox.style.marginBottom = "2.5px";
      ai.style.margin = "5px 5px 5px 5px";

      chatbox.scrollTo(0, chatbox.scrollHeight);
    });
  });
  
  // function handleKeyPress(event) {
  //   if (event.key === 'enter') {
  //     console.log("enter dipencet!");
  //   }
  // }
  
  const textareaSize = document.querySelector("#message");
  textareaSize.addEventListener("keyup", e => {
    textareaSize.style.height = "33.5px";
    let height = e.target.scrollHeight;
    textareaSize.style.height = (height + "px");
  });
  
  function checkTextarea() {
  var textareaContent = document.getElementById('message').value;
  var sendButton = document.getElementById('send');

  if (textareaContent.trim() !== '') {
    sendButton.removeAttribute('disabled');
    // Jika ingin mengubah warna button, tambahkan properti CSS berikut:
    // sendButton.style.backgroundColor = 'blue'; // Ganti dengan warna yang diinginkan
  } else {
    sendButton.setAttribute('disabled', 'true');
    // Jika ingin mengubah warna button, kembalikan warna ke default atau sesuaikan:
    // sendButton.style.backgroundColor = ''; 
  }
}

let intervalID = setInterval(function() {
  
}, 1000);

  
  //let toxicText = system.
//}
  
  
