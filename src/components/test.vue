<template>
    <div class="chat-container">
      <div class="chat-header">
        <h2>Your Personal AI Assistant</h2>
        <p>Ask me anything, and I'll help you find the answers you need.</p>
      </div>
  
      <div class="chat-history">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
          <p>{{ message.text }}</p>
          <div v-if="message.images" class="image-links">
            <img v-for="(image, imgIndex) in message.images" :key="imgIndex" :src="image" alt="Image" />
          </div>
        </div>
      </div>
  
      <div class="chat-input">
        <input
          v-model="userInput"
          type="text"
          placeholder="Type your message here..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInput: "",
        messages: [],
      };
    },
    methods: {
      sendMessage() {
        if (this.userInput.trim() === "") return;
  
        // Add user message to chat history
        this.messages.push({ sender: "user", text: this.userInput });
  
        // Simulate assistant response (replace with your backend logic)
        setTimeout(() => {
          const response = this.getAssistantResponse(this.userInput);
          this.messages.push(response);
        }, 1000);
  
        // Clear input
        this.userInput = "";
      },
      getAssistantResponse(userInput) {
        // Simulate assistant logic (replace with your backend logic)
        if (userInput.toLowerCase().includes("modern website design")) {
          return {
            sender: "assistant",
            text: "Here are some modern website designs that could inspire you. I've selected these based on their clean layouts, modern aesthetics, and effective use of white space.",
            images: [
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
              "https://via.placeholder.com/150",
            ],
          };
        } else {
          return {
            sender: "assistant",
            text: "I'm here to help! Feel free to ask me anything.",
          };
        }
      },
    },
  };
  </script>
  
  <style>
  .chat-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .chat-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .chat-header h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .chat-header p {
    font-size: 14px;
    color: #666;
  }
  
  .chat-history {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .message {
    margin-bottom: 15px;
  }
  
  .message.user {
    text-align: right;
  }
  
  .message.user p {
    background-color: #0078d7;
    color: #fff;
    display: inline-block;
    padding: 10px;
    border-radius: 10px;
  }
  
  .message.assistant p {
    background-color: #f1f1f1;
    color: #333;
    display: inline-block;
    padding: 10px;
    border-radius: 10px;
  }
  
  .image-links {
    margin-top: 10px;
  }
  
  .image-links img {
    max-width: 100px;
    margin-right: 10px;
    border-radius: 5px;
  }
  
  .chat-input {
    display: flex;
  }
  
  .chat-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .chat-input button {
    padding: 10px 20px;
    background-color: #0078d7;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .chat-input button:hover {
    background-color: #005bb5;
  }
  </style>