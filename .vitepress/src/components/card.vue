<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  padding: 32px;
  box-shadow: 0 1.5px 3px 0 #00000026;
  border: 1px solid #ebedf0;
  border-radius: 6.4px;
  transition: all 200ms ease;
  transition-property: border, box-shadow;
  overflow: hidden;
}

.card:hover{
  cursor: pointer;
  border-color: #2e8555;
  box-shadow: 0 3px 6px 0 #0003;
}

</style>

