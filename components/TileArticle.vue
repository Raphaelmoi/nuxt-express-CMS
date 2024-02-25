<template>
  <a
    :href="link || 'javascript:;'"
    class="TileArticle"
    :class="img ? null : 'noimgTile'"
  >
    <img :src="img" alt="ape" v-if="img" />
    <div>
      <p class="TA_title" v-html="titre"></p>
      <span class="TA_date">{{ date }}</span>
      <div class="TA_desc" v-html="description"></div>
      <div class="TA_btn btn-gradient">voir +</div>
    </div>
  </a>
</template>

<script>
export default {
  name: "TileArticle",
  props: ["link", "img", "titre", "date", "description"],
  methods: {}
};
</script>

<style>
.TileArticle {
  background: #fff;
  box-shadow: 0 0 8px #0003;
  width: 320px;
}
.TileArticle > img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.TileArticle > div {
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  height: calc(100% - 200px - 1em);
}
.noimgTile.TileArticle > div {
  height: calc(100% - 1em);
}
.TA_title {
  text-transform: uppercase;
  margin: 0;
  font-weight: bold;
}
.TA_date {
  font-size: 0.8rem;
  opacity: 0.9;
}
.TA_desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  margin-bottom: 0.5em;
  font-size: 0.9em;
}
.noimgTile .TA_desc {
  -webkit-line-clamp: 12;
  line-clamp: 12;
}
.TA_btn {
  margin-top: auto !important;
  margin-bottom: 0.5em;
  padding: 0.25em 2em;
  /* border: 1px black solid; */
}
</style>
