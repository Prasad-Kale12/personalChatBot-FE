<template>
  <div class="main-container">
    <div class="chat-container">
      <div class="left-section">
        <img  src="../assets/aiChat.jpg" alt="AI Assistant" class="avatar" />

      </div>
      <div class="right-section">
        <section class="header">
          <h1>Prasad's AI Assistant</h1>
          <p>Ask me anything about my personal and professional journey.</p>
        </section>
        <div class="chat-box" ref="chatBox">
          <div v-for="(msg, index) in messages" :key="index" :class="msg.type">
            <p :class="msg.type === 'loading-message' ? 'dots': ''">{{ msg.text }}</p>
          </div>
        </div>
        <div class="input-box-container">
          <input :disabled="isLoading" type="text" v-model="message" placeholder="Ask question to Prasad's assistant..."
            @keyup.enter="sendMessage" />
          <button :disabled="isLoading" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getMessageFromAssistant } from "../routes/assistantServices";

export default {
  data() {
    return {
      isLoading: false,
      message: "",
      linkForPhoto: "",
      messages: []
    };
  },
  methods: {
    async sendMessage() {
      if (this.message.trim() === "") return;
      
      this.isLoading = true;
      this.messages.push({ text: this.message, type: "user-message" });
      this.scrollToBottom();
      
      const mes = this.message;
      this.message = "";
      
      this.messages.push({ text: "...", type: "loading-message" });
      this.scrollToBottom();
      
      try {
        const res = await getMessageFromAssistant(mes);
        this.messages.pop();
        this.messages.push({
          text: res.status === 200 && res.data.message ? res.data.message : "Sorry, I couldn't understand your question",
          type: "ai-message"
        });
      } catch (error) {
        this.messages.pop();
        this.messages.push({ text: "Error retrieving response try again", type: "ai-message" });
      }
      
      this.isLoading = false;
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
      });
    }

  }
};
</script>

<style scoped>
.loading-message .dots p:nth-child(1) {
  animation-delay: 0s;
}

.loading-message .dots p:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-message .dots p:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.loading-message .dots {
  display: inline-block;
  animation: bounce 1.5s infinite;
}
.loading-message {
  display: inline-block;
  background: linear-gradient(135deg, #e03a50, #eba197);
  color: white;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  align-self: flex-start;
  /* animation: bounce 1.5s infinite; */
}
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.chat-container {
  display: flex;
  width: 60%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Left Section */
.left-section {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a578ec, #dbc1ec);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  animation: gradientAnimation 3s infinite alternate;
}

.avatar {
  width: 80%;
  max-width: 250px;
  border-radius: 10%;
}

/* Right Section */
.right-section {
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.header {
  text-align: center;
}

.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  height: 300px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 10px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Messages */
.user-message {
  background: linear-gradient(135deg, #a578ec, #c7aed8);
  color: white;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  align-self: flex-end;
  animation: gradientAnimation 3s infinite alternate;
}

.ai-message {
  background: linear-gradient(135deg, #e03a50, #eba197);
  animation: gradientAnimation 3s infinite alternate;
  color: white;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  align-self: flex-start;
}

/* Input Box */
.input-box-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  background: linear-gradient(135deg, #a578ec, #dbc1ec);
  animation: gradientAnimation 3s infinite alternate;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}



/* MOBILE RESPONSIVENESS */
@media (max-width: 768px) {
  .chat-container {
    width: 90%;
    flex-direction: column;
    height: auto;
  }

  .left-section {
    width: 100%;
    height: 150px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 0;
    display: flex;
    justify-content: center;
  }

  .avatar {
    width: 60%;
    border-radius: 60%;
    max-width: 150px;
  }

  .right-section {
    width: 100%;
    padding: 15px;
  }

  .chat-box {
    height: 250px;
  }

  .input-box-container {
    flex-direction: column;
    gap: 5px;
  }

  input {
    width: 100%;
    padding: 12px;
  }

  button {
    width: 100%;
    padding: 12px;
  }
}

</style>
