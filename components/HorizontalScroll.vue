<template>
  <div>
    <div class="scrollXcontainer">
      <div>
        <slot></slot>
      </div>
    </div>
    <div class="scrollAction">
      <img
        src="/img/icones/arrow-down.svg"
        height="25"
        style="transform: rotate(90deg)"
        @click="scrollX(-1)"
      />
      <img
        src="/img/icones/arrow-down.svg"
        height="25"
        style="transform: rotate(-90deg)"
        @click="scrollX(1)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalScroll",
  methods: {
    scrollX(direction) {
      const elHS = this.$el.querySelector(".scrollXcontainer");
      const scrollDifference = elHS.clientWidth * 0.67;
      elHS.scrollLeft += scrollDifference * direction;
    }
  }
};
</script>

<style>
.scrollXcontainer {
  overflow: auto;
  max-width: 80vw;
  position: relative;
  scrollbar-width: 8px;
  scroll-behavior: smooth;
}
.scrollXcontainer > div {
  display: inline-flex;
  background: var(--clear);
  min-width: 100%;
}
.scrollXcontainer > div > * {
  /* width: 300px; */
  margin: 0.5em 0.5em 1em;
  /* background: var(--tile-gradiant); */
}
.scrollXcontainer::-webkit-scrollbar {
  height: 0.5em;
}
.scrollAction {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.scrollAction > * {
  margin: 1em 1em 0;
  width: 1em;
  height: 1em;
  padding: 0.25em;
  object-fit: contain;
  cursor: pointer;
  border-radius: 50%;
  border: 1px var(--clear-1) solid;
  opacity: 0.7;
  transition: 0.5s ease;
}
.scrollAction > *:hover {
  opacity: 1;
  background: var(--clear-1);
}
</style>
