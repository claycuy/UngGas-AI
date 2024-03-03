# UngGas Studio Official AI

## Grandy AI :

**Code:**
```
  <!-- HTML Code -->
  <div id="chatbox">
  <h1 id="name">Grandy AI</h1>
    <p id="question">ada yang bisa dibantu hari ini?</p>
  </div>
  <div class="container">
    <div  class="input-container">
  <textarea type="text" id="message" oninput="checkTextarea()" placeholder="Type your message..."></textarea>
  <button id="send" onclick="commandSended()">Send</button>
    </div>
  </div>
```
```
//JSON Code(messages.json)
{
  "greeting": {
    "match": ["hello", "hey"],
    "response": ["hello", "hi"]
  },

"empty": {
    "match": [" ", ""],
    "response": ["error, unknown text.", "sorry unknown text, please check your text!"]
  },
  
  "default": "Sorry, I don't understand yet. Can you repeat?"
}
```
```
//JSON Code(system.json)
{
"basicCommand": {
  "default": ["what's new", "apa yang baru", "update"]
},
"system": {
  "name": ["Grandy AI"],
  "default_language": ["indoensian"],
  "type": ["chatbot"],
  "status": ["online", "offline"]
}
}
```

**Link:**
- 0.1 BETA1:
```
https://cdn.jsdelivr.net/gh/UngGasStudio/UngGas-AI@main/script/grandy_ai(0.1%20BETA1).js
```

**Directory:**
- messages.json directory:
```
json/messages.json
```
- system.json directory:
```
json/system.json
```
