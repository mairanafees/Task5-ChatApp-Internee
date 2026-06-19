const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let messages =
    JSON.parse(localStorage.getItem("chatMessages")) || [];

function saveMessages() {
    localStorage.setItem(
        "chatMessages",
        JSON.stringify(messages)
    );
}

function getTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function addMessage(text, type) {

    const messageData = {
        text,
        type,
        time: getTime()
    };

    messages.push(messageData);
    saveMessages();

    displayMessage(messageData);
}

function displayMessage(message) {

    const div = document.createElement("div");

    div.classList.add("message");
    div.classList.add(message.type);

    div.innerHTML = `
        ${message.text}
        <span class="time">${message.time}</span>
    `;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function loadMessages() {

    messages.forEach(msg => {
        displayMessage(msg);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}
function botReply(userMessage) {

    const msg = userMessage.toLowerCase().trim();

    let reply;

    if (msg.includes("hi") || msg.includes("hello")) {
        reply = "Hello! 👋 How can I help you?";
    }
    else if (msg.includes("how are you")) {
        reply = "I'm doing great! 😊";
    }
    else if (msg.includes("your name") || msg.includes("name")) {
        reply = "I'm your ChatBot 🤖";
    }
    else if (msg.includes("bye")) {
        reply = "Goodbye! Have a great day ❤️";
    }
    else if (msg.includes("thanks") || msg.includes("thank you")) {
        reply = "You're welcome 🌸";
    }
    else if (msg.includes("html")) {
        reply = "HTML is used to create the structure of web pages.";
    }
    else if (msg.includes("css")) {
        reply = "CSS is used to style and design web pages.";
    }
    else if (msg.includes("javascript")) {
        reply = "JavaScript adds interactivity to websites.";
    }
    else {
        const randomReplies = [
            "Interesting 🤔",
            "Tell me more 😊",
            "That's nice 👍",
            "I understand 🌸",
            "Can you explain further?"
        ];

        reply =
            randomReplies[
                Math.floor(Math.random() * randomReplies.length)
            ];
    }

    setTimeout(() => {
        addMessage(reply, "received");
    }, 1000);
}

function sendMessage() {

    const text = messageInput.value.trim();

    if(text === "") return;

    addMessage(text, "sent");

    botReply(text);

    messageInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        sendMessage();
    }

});

loadMessages();