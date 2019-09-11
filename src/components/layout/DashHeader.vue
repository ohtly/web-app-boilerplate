<template>
  <div class="dash_header">
    <a href="#" class="logo">
      <h1>Logo</h1>
    </a>
    <div class="toolbar">
      <div></div>
      <slot name="header" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.dash_header {
  flex: 1;
  display: flex;
}
.logo {
  display: flex;
  flex: 0 0 250px;
  height: 70px;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0;
  color: #fff;
  background-color: #dc5a60;
  font-size: 1rem;
}

.logo h1 {
  margin: 0;
}

.toolbar {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing);
}
</style>