async function sendMessage() {

    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();

    if (message === "") return;

    const chatBox = document.getElementById("chat-box");

    // User Message
    chatBox.innerHTML += `
        <div class="message user">
            ${message}
        </div>
    `;

    inputField.value = "";

    // Typing indicator
    const typing = document.createElement("div");
    typing.className = "message bot";
    typing.innerText = "Typing...";
    chatBox.appendChild(typing);

    chatBox.scrollTop = chatBox.scrollHeight;

    // API Call
    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
    });

    const data = await response.json();

    // Remove typing
    chatBox.removeChild(typing);

    // Bot Message
    chatBox.innerHTML += `
        <div class="message bot">
            ${data.response}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}

// ENTER KEY SUPPORT
document.getElementById("user-input")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });