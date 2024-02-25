<template>
  <div class="layout_skeleton">
    <!-- <LeftNav /> -->
    <!-- <MessageToUser></MessageToUser> -->
    <div>
      <p v-for="(item, index) in error" :key="index">
        <span style="color: var(--color-1)">{{ index }}</span> :
        {{ item }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["error"],
  layout: "error" // you can set a custom layout for the error page
};
</script>
<style>
.layout_skeleton {
  display: flex;
}

.layout_content {
  flex: 1;
  /* margin-left: 1rem; */
}
</style>