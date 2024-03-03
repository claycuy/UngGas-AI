# UngGas Studio Official AI

**Grandy AI :**

Code:
```
<!-- HTML Code -->
  <textarea type="text" id="message" oninput="checkTextarea()" placeholder="Type your message..."></textarea>
  <button id="send" onclick="commandSended()">Send</button>
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

**Link:**
- 0.1 BETA1:
```
https://cdn.jsdelivr.net/gh/UngGasStudio/UngGas-AI@main/script/grandy_ai(0.1%20BETA1).js
```
