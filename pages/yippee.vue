<template>
    <Button link="/yippee" buttonTextKey="button.yippee" :rainbowBackground="true" @click="playSound"/>
</template>

<script>
export default {
  methods: {
    playSound() {
      const audio = new Audio('/audio/yippee.mp3'); // Specify the correct path to your audio file
      audio.play();
    }
  }
}
</script>