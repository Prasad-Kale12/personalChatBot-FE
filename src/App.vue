<template>
  <v-app>
    <router-view />
    <Chat></Chat>
  </v-app>
</template>

<script>
import Chat from "@/components/ChatComponent.vue";
export default { components: { Chat } };
</script>
