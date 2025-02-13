<script setup lang="ts">
import {  onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  const user = localStorage.getItem('user');

  if (user === null || user === undefined) {
    router.push('/'); // Redirecionar para a página inicial
  }
});
</script>

<template>
  <BCardGroup deck>
    <BCard
        header="featured"
        header-tag="header"
        footer="Card Footer"
        footer-tag="footer"
        title="Title"
    >
      <BCardText>Header and footers using props.</BCardText>
      <BButton href="#" variant="primary">Go somewhere</BButton>
    </BCard>
    <BCard title="Title" header-tag="header" footer-tag="footer">
      <template #header>
        <h6 class="mb-0">Header Slot</h6>
      </template>
      <BCardText>Header and footers using slots.</BCardText>
      <BButton href="#" variant="primary">Go somewhere</BButton>
      <template #footer>
        <em>Footer Slot</em>
      </template>
    </BCard>
  </BCardGroup>
</template>

<style scoped>

</style>