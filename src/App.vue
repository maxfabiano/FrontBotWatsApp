<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import './assets/slogan.jpg'
</script>
<template>
  <Navbar />
  <router-view />  <!-- Adicione esta linha para renderizar as rotas -->
</template>
<style scoped>
</style>
