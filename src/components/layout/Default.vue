<template>
  <div class="app">
    <header class="app_header">
      <dash-header>
        <template #header>
          <slot name="header" />
        </template>
      </dash-header>
    </header>
    <nav class="app_nav">
      <dash-sidebar />
    </nav>
    <main class="app_main">
      <slot name="content" />
    </main>
    <footer class="app_footer">
      <dash-footer />
    </footer>
  </div>
</template>

<script>
import DashSidebar from "./DashSidebar";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

export default {
  components: {
    DashSidebar,
    DashHeader,
    DashFooter
  }
};
</script>

<style scoped>
.app {
  --spacing: 1rem;
  display: grid;
  height: 100vh;

  grid-template-rows: 70px 1fr 70px;
  grid-template-columns: 250px 1fr;
  grid-template-areas: "header header" "nav main" "footer footer";

  background-color: burlywood;
}

.app_main {
  flex: 1;
  grid-area: main;
  padding: var(--spacing);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background-color: #f4f7fa;
  display: flex;
}

@media screen and (min-width: 48rem) {
  .app {
    --spacing: 2rem;
  }
}

.app_header {
  display: flex;
  flex-basis: 100%;
  grid-area: header;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  position: relative;
}

.app_nav {
  grid-area: nav;
  background-color: #313541;
  display: flex;
}

.app_footer {
  grid-area: footer;
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 var(--spacing);
  color: #4e5561;
  background-color: #1d2127;
}
</style>