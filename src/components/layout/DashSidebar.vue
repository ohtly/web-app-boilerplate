<template>
  <div class="dash__nav">
    <ul class="menu">
      <li class="menu_item">
        <router-link to="/" class="menu_link">工作台</router-link>
      </li>
      <li class="menu_item">
        <router-link to="/error-demo" class="menu_link">演示对Error/Exception的处理</router-link>
      </li>
      <li class="menu_item"></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.dash__nav {
  flex: 1;
}
.menu {
  list-style-type: none;
  padding: 0;
}
.menu_item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.menu_link {
  display: block;
  padding: 1rem 2rem;
  color: #76808f;
  text-decoration: none;
}
.menu_link:hover,
.menu_link:focus {
  color: #fff;
  background-color: #1f222d;
}
</style>