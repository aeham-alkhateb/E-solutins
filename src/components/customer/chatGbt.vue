<template>                       

    <v-card class="chat-container" width="800" >

                     <vue-custom-scrollbar class="scroll-areagbt" he>

        <div class="chat-messages">
            <v-list v-for="(message, index) in messages" :key="index" class="chat-message">
                 
                <v-card     class="mx-auto" v-if="message.isBot" elevation="4">
                        <v-list-item >
                    <v-list-item-avatar>
                  <img
                    src="@/assets/img/chatbot (1).png"
                    >
                </v-list-item-avatar>
           
                  <v-card-text class="text-h6 font-weight-bold">"{{ message.text }}"</v-card-text></v-list-item>
                                </v-card>
                <v-card     class="mx-auto" v-else color="grey" elevation="4">
                            <v-list-item >
                        <v-list-item-avatar>
                      <img
                        src="@/assets/img/download.svg"
                        >
                    </v-list-item-avatar>

                      <v-card-text class="text-h6 font-weight-bold white--text">"{{ message.text }}"</v-card-text></v-list-item>
                </v-card> 
               
            </v-list>
             <lottie-animation
                              ref="anim"
                              :animationData="require('@/assets/theme/wired-outline-331-loader-2.json')"
                              v-show="loading"
              
                              :speed="2"
                              style=";left: 50%; width: 10%"
                      
                              loop
                            />
              
        </div>
      
                    </vue-custom-scrollbar>

            <div class="chat-input">

                <v-text-field
                v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type your message..." 
                prepend-icon="message"
                filled
                rounded
                dense
                hide-spin-buttons
            
               >
             </v-text-field><v-btn @click="sendMessage" icon> <v-icon>mdi-send</v-icon></v-btn>
        
           
            </div>
    </v-card>

</template>

<script>
import axios from 'axios';
import vueCustomScrollbar from 'vue-custom-scrollbar'
import LottieAnimation from 'lottie-web-vue'

export default {
    components: {
          LottieAnimation,
        vueCustomScrollbar
    },
    data() {
        return {
            loading:false,
            inputMessage: '',
            messages: [],
        };
    },
    methods: {
        async sendMessage() {           
            this.loading = true;
            const userMessage = this.inputMessage.trim();
            if (userMessage !== '') {
                this.messages.push({ text: userMessage, isBot: false });
                this.inputMessage = '';

                try {
                    const response = await axios.post(
                        'https://api.openai.com/v1/chat/completions',
                        {
                            messages: [
                                { role: 'system', content: 'You are a helpful assistant.' },
                                { role: 'user', content: userMessage },
                                
                            ], model: 'gpt-3.5-turbo-16k-0613',
                        },
                        {
                            headers: {
                                Authorization: '',
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    const botMessage = response.data.choices[0].message.content;
                    this.messages.push({ text: botMessage, isBot: true });
                     this.loading = false;

                } catch (error) {
                    console.error('Error:', error);
                }
            }
        },
    },
};
</script>

<style>
.scroll-areagbt{
      height: 450px;

}
.chat-container {
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}

.chat-message {
    margin-bottom: 5px;
}

.bot-message {
    background-color: #f5f5f5;
    padding: 5px;
    border-radius: 5px;
}

.user-message {
    background-color: #c3c3c3;
    padding: 5px;
    border-radius: 5px;
}

.chat-input {
    display: flex;
    margin-bottom: 0%;
}
</style>
