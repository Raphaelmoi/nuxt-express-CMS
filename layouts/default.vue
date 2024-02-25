<template>
  <div class="layout_skeleton">
    <LeftNav />
    <MessageToUser></MessageToUser>
    <section class="layout_content">
      <!-- <Nuxt /> -->
      <Nuxt keep-alive />
    </section>
  </div>
</template>

<style>
.layout_skeleton {
  display: flex;
}

.layout_content {
  flex: 1;

  background: var(--clear);
  /* padding-left: 3rem; */
}
</style>