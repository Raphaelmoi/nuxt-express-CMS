<template>
  <div>
    <div class="pagecontent_head">
      <div class="flex wrap">
        <nuxt-link to="/mediatheque " class="titleBloc">Médiathéque</nuxt-link>

        <div class="flex mo">
          <nuxt-link to="/mediatheque/images" class="smlBtn">Images</nuxt-link>
          <nuxt-link to="/mediatheque/videos" class="smlBtn">Vidéos</nuxt-link>
          <nuxt-link to="/mediatheque/docs" class="smlBtn">Fichiers</nuxt-link>
        </div>
      </div>

      <div class="actionBtn">
        <img
          src="/img/icones/arrow-up.svg"
          width="30"
          height="20"
          class="arrowBtn"
        />
        <img
          src="/img/icones/arrow-down.svg"
          width="30"
          height="20"
          class="arrowBtn"
        />
        <img src="/img/icones/plus.svg" width="30" height="20" />
      </div>
    </div>

    <div class="home_grid_mediatheque">
      <div>
        <iframe
          src="https://www.youtube.com/embed/i16rR6po6qo"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <nuxt-link to="/aaa" class="double_v">
        <img src="/img/ape5.png" />
      </nuxt-link>
      <div>
        <img src="/img/ape1.png" />
      </div>
      <div>
        <img src="/img/ape2.png" />
      </div>
      <div>
        <img src="/img/ape3.jpg" />
      </div>
      <div>
        <img src="/img/ape4.png" />
      </div>
      <div class="isFile">
        <div class="titreFile">Titre fichier</div>
        <div class="fullnameFile">nom_complet_du_fichier.pdf</div>
        <img src="/img/icones/-arrow-up.svg" />
      </div>
      <div class="double_h hide1300-1100">
        <img src="/img/ape6.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeMediatheque",
  methods: {}
};
</script>

<style>
.home_grid_mediatheque {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1em;
  grid-auto-flow: row dense;
  margin-bottom: 2em;
  grid-auto-rows: 250px;
}
.home_grid_mediatheque > * {
  background-image: linear-gradient(
    -45deg,
    var(--clear-3),
    #94a6c1,
    #778daf,
    #5f728f
  );
  border-radius: 8px;
  overflow: hidden;
}
.home_grid_mediatheque iframe,
.home_grid_mediatheque video,
.home_grid_mediatheque img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.double_v {
  grid-row: span 2;
  height: 100%;
}
.double_h {
  grid-column: span 2;
}
.home_grid_mediatheque .isFile {
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.home_grid_mediatheque .titreFile {
  font-weight: bold;
  text-align: center;
}
.home_grid_mediatheque .fullnameFile {
  font-size: 0.8em;
  overflow-wrap: anywhere;
}
.home_grid_mediatheque .isFile img {
  height: 50%;
  width: 50%;
  object-fit: contain;
}
@media all and (max-width: 1300px) {
  .home_grid_mediatheque {
    /* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .hide1300-1100 {
    display: none;
  }
}
@media all and (max-width: 1100px) {
  .home_grid_mediatheque {
    grid-template-columns: repeat(auto-fill, minmax(251px, 1fr));
  }
  .hide1300-1100 {
    display: flex;
  }
}
</style>
