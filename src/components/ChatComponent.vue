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
            <p>{{ msg.text }}</p>
          </div>
        </div>
        <div class="input-box-container">
          <input :disabled="isLoading" type="text" v-model="message" placeholder="Type your message here..."
            @keyup.enter="sendMessage" />
          <button v-if="!isLoading" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getMessageFromAssistant } from "../routes/assistantServices";
import { photos } from '../utils/photos'

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
      this.isLoading = true;
      if (this.message.trim() !== "") {
        this.messages.push({ text: this.message, type: "user-message" });
        this.scrollToBottom()
        const mesg = this.message;
        this.message = "";
        const res = await getMessageFromAssistant(mesg);

        this.messages.push({
          text: res.status === 200 && res.data.message ? res.data.message : "Sorry, I couldn't understand your question",
          type: "ai-message"
        });
        this.isLoading = false;
         this.scrollToBottom()
      }
    },
    getRandomImage() {

      return photos[Math.floor(Math.random() * photos.length)];
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        chatBox.scrollTop = chatBox.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

.chat-container {
  display: flex;
  width: 60%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

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
.grayAutomation {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dad9db, #ecdcc9);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  animation: gradientAnimation 3s infinite alternate;
}

.right-section {
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.header {
  text-align: center;
}

.avatar {
  width: 80%;
  max-width: 250px;
  border-radius: 10%;
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

.input-box-container {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

button:hover {
  background: linear-gradient(135deg, #e03a50, #eba197);
}
</style>
