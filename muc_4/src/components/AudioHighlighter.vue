<template>
    <div>
      <audio ref="audioPlayer" :src="audioSource" controls @timeupdate="highlightText"></audio>
      <div v-for="(line, index) in dialogue" :key="index" :class="getHighlightClass(index)">
        <span>{{ line }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        audioSource: '/audio.opus', // Thay đường dẫn đúng với file âm thanh
        dialogue: [],
        timestamps: [],
        currentIndex: -1
      };
    },
    methods: {
      async loadFiles() {
        try {
          const dialogueRes = await axios.get('/output_AB.txt'); // Đường dẫn file output_AB.txt
          const timestampRes = await axios.get('/timestamp.txt'); // Đường dẫn file timestamp.txt
  
          this.dialogue = dialogueRes.data.split('\n');
          this.timestamps = timestampRes.data.split('\n').map(line => {
            const [timeElapsed, duration, index, wordLength] = line.split(',').map(Number);
            return { timeElapsed, duration, index, wordLength };
          });
        } catch (err) {
          console.error('Error loading files:', err);
        }
      },
      highlightText() {
        const currentTime = this.$refs.audioPlayer.currentTime * 1000; // Chuyển sang mili giây
        const timestamp = this.timestamps.find(ts => ts.timeElapsed <= currentTime && currentTime <= ts.timeElapsed + ts.duration);
  
        if (timestamp) {
          this.currentIndex = timestamp.index;
        }
      },
      getHighlightClass(index) {
        return index === this.currentIndex ? 'highlight' : '';
      }
    },
    mounted() {
      this.loadFiles();
    }
  };
  </script>
  
  <style>
  .highlight {
    background-color: yellow;
  }
  </style>
  