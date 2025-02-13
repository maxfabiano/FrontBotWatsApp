<script setup lang="ts">
</script>

<template>
  <BNavbar v-b-color-mode="'dark'" toggleable="lg" variant="outline-primary">
    <BNavbarBrand href="#">Inicio</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav >
        <BNavItem href="#">Produtos</BNavItem>
      </BNavbarNav>
      <BNavbarNav>
        <BNavItem href="#">Acessar</BNavItem>
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Conta</em>
          </template>
          <BDropdownItem href="#">Perfil</BDropdownItem>
          <BDropdownItem href="#">Sair</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<style scoped>
.navbar{
  left: 0;
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  background-color: #f9f9f9;
  color: #fff;
  text-decoration-color: white;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 1px 1px 1px #000;
}

</style>