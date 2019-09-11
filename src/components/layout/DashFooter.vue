<template>
  <div class="dash__footer">
    <ul class="ticker">
      <li class="ticker_item">帮助</li>
      <li class="ticker_item">发送反馈</li>
      <li class="ticker_item">关于我们</li>
    </ul>
    <span>&copy; 2019 公司</span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.dash__footer {
  flex: 1;
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  align-items: center;
}
.ticker {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}
.ticker_item {
  margin-right: 1rem;
}
</style>