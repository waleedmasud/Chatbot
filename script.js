async function sendMessage() {
    let userMessage = document.getElementById("user-message").value;
    let chatMessages = document.getElementById("chat-messages");

    chatMessages.innerHTML += `
        <div class="message-container">
            <img src="My pic.jpg" alt="User" class="user-pic">
            <div class="message-content"><strong></strong> ${userMessage}</div>
        </div>`;
       const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1", {
        method: 'POST',
        headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: userMessage })
    });
    response.text().then(responseText => {
        let responseJson = JSON.parse(responseText);
        let responseMessage = responseJson[0].generated_text;
        setTimeout(function() {
            chatMessages.innerHTML += `
                <div class="message-container">
                    <img src="A_black_mask_man_using_Macbook_pro_in_a_room.png" alt="Chatbot" class="chatbot-pic">
                    <div class="message-content"><strong>Chatbot:</strong> ${responseMessage}</div>
                    </div>`;
        }, 50);
})

    document.getElementById("user-message").value = "";
}

 document.getElementById("user-message").addEventListener("keypress", function(event) {
     if (event.keyCode == 13) {
         event.preventDefault();
         sendMessage();
     }
 });

 document.getElementById("delete-messages").addEventListener("click", function() {
     document.getElementById("chat-messages").innerHTML = "";
 });