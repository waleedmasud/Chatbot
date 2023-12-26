async function sendMessage() {

    const userMessage = getUserMessage();
    
    try {
      const response = await fetchAPI(userMessage);
      const responseMessage = await getResponseMessage(response);
      
      displayUserMessage(userMessage);
      await displayBotMessage(responseMessage);
      
    } catch (error) {
      console.log('Error:', error); 
    }
  
    clearUserMessage();
  
  }
  
  function getUserMessage() {
    const message = document.getElementById("user-message").value;
    
    // TODO: validate input 
    
    return message;
  }
  
  async function fetchAPI(userMessage) {
  
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1", {
      method: 'POST',
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: userMessage })
    });
    
    return response;
  } 
  
  function getResponseMessage(response) {
    return response.json().then(json => json[0].generated_text);
  }
  
  function displayUserMessage(message) {
    const chatMessages = document.getElementById("chat-messages");
  
    chatMessages.innerHTML += `
      <div class="message-container">
        <img src="My pic.jpg" alt="User" class="user-pic">
        <div class="message-content"><strong></strong> ${message}</div>
      </div>
    `;
  }
  
  async function displayBotMessage(message) {
  
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const chatMessages = document.getElementById("chat-messages");
  
    chatMessages.innerHTML += `
      <div class="message-container">
        <img src="A_black_mask_man_using_Macbook_pro_in_a_room.png" alt="Chatbot" class="chatbot-pic">
        <div class="message-content"><strong>Chatbot:</strong> ${message}</div>
      </div>
    `;
  
  }
  
  function clearUserMessage() {
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