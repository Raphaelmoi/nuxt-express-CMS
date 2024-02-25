<template>
  <div>
    <header class="header_site">
      <div>
        <h1>Accueil</h1>
      </div>
    </header>
    <div class="page_content">
      <div class="main_actions">
        <nuxt-link to="/articles/create/new">
          <img src="/img/icones/pen.svg" alt="icone" />
          <span>Créer article</span>
        </nuxt-link>
        <div>
          <img src="/img/icones/popup.svg" alt="icone" />
          <span>Pop up </span>
        </div>
        <div>
          <img
            src="/img/icones/shop.svg"
            alt="icone"
            style="margin-left: 6px"
          />
          <span>La boutique</span>
        </div>
        <div>
          <img src="/img/icones/news.svg" alt="icone" />
          <span>À la une</span>
        </div>
        <div>
          <img src="/img/icones/cog.svg" alt="icone" />
          <span>Gestion</span>
        </div>
      </div>
      <div></div>
      <div>
        <!-- actions courante type gestion / boutique / gestions des infos type
        telephone/ horaires / message popup evenemnt / liens compte fb/
        insta/... -->
      </div>
    </div>
    <!-- ====================================================================================================== -->
    <!-- ====================================================================================================== -->
    <div class="page_content">
      <home-mediatheque></home-mediatheque>
    </div>
    <!-- ====================================================================================================== -->
    <!-- ====================================================================================================== -->
    <div class="page_content">
      <div class="pagecontent_head">
        <div><p class="titleBloc">Produits</p></div>
        <div class="actionBtn flex middleAlign">
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
      <div class="grid_categories">
        <div>Tous les produits</div>
        <div>Chaussettes</div>
        <div>Chaussures</div>
        <div>Pantalons</div>
        <div>Chemises</div>
        <div>T-shirts</div>
        <div>Pulls</div>
      </div>
    </div>
    <!-- ====================================================================================================== -->
    <!-- ====================================================================================================== -->
    <div class="page_content">
      <div class="pagecontent_head">
        <div><p class="titleBloc">Articles</p></div>
        <div class="actionBtn flex middleAlign">
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
          <!-- <div class="TA_btn btn-gradient">Tous les articles</div> -->
        </div>
      </div>

      <horizontal-scroll>
        <tile-article
          img="/img/ape6.jpg"
          titre="Lorem ipsuT yeah"
          date="date"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum itaque
        porro ratione quasi assumenda culpa exercitationem reprehenderit tempora
        ut beatae!Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Laborum itaque porro ratione quasi assumenda culpa exercitationem
        reprehenderit tempora ut beatae! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Laborum itaque porro ratione quasi assumenda culpa
        exercitationem reprehenderit tempora ut beatae!Lorem ipsum dolor sit,
        amet consectetur adipisicing elit. Lab"
        ></tile-article>
        <tile-article
          titre="Lorem ipsuT yeah"
          img="/img/ape1.png"
        ></tile-article>
        <tile-article
          img="/img/ape2.png"
          titre="Lorem ipsuT yeah"
          date="date"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum itaque
        porro ratione quasi assumenda culpa exercitationem reprehenderit tempora
        ut beatae!Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Laborum itaque porro ratione quasi assumenda culpa exercitationem
        reprehenderit tempora ut beatae! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Laborum itaque porro ratione quasi assumenda culpa
        exercitationem reprehenderit tempora ut beatae!Lorem ipsum dolor sit,
        amet consectetur adipisicing elit. Lab"
        ></tile-article>
        <tile-article img="/img/ape3.jpg"></tile-article>
        <tile-article
          titre="Lorem ipsuT yeah"
          date="date"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum itaque
        porro ratione quasi assumenda culpa exercitationem reprehenderit tempora
        ut beatae!Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Laborum itaque porro ratione quasi assumenda culpa exercitationem
        reprehenderit tempora ut beatae! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Laborum itaque porro ratione quasi assumenda culpa
        exercitationem reprehenderit tempora ut beatae!Lorem ipsum dolor sit,
        amet consectetur adipisicing elit. Lab"
        ></tile-article>
        <tile-article img="/img/ape5.png"></tile-article>
        <tile-article img="/img/ape6.jpg"></tile-article>
      </horizontal-scroll>
    </div>
  </div>
</template>

<script>
import HorizontalScroll from "../components/HorizontalScroll.vue";
export default {
  components: { HorizontalScroll },
  data() {
    return {};
  },

  methods: {}
};
</script>
<style>
/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
.grid_categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.5em;
  grid-auto-flow: row dense;
  margin-bottom: 2em;
  grid-auto-rows: 100px;
}
.grid_categories > * {
  background: linear-gradient(
    45deg,
    var(--clear-3),
    #94a6c1,
    #778daf,
    #94a6c1,
    #5f728f
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0.5em;
  transition: 0.5s ease;
  background-size: 150% auto;
  background-position: center left;
  cursor: pointer;
  color: white;
  box-shadow: inset 0 0 0 8px #00000005;
}
.grid_categories > *:hover {
  background-position: center right;
  box-shadow: inset 0 0 0 8px #00000010;
}
.main_actions {
  display: flex;
  flex-wrap: wrap;
}
.main_actions > * {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  text-align: center;
  flex-direction: column;
  background: var(--tile-gradiant);
  background-size: 150% 125%;
  background-position: center bottom;
  background-image: linear-gradient(
    45deg,
    #d3deed,
    var(--clear-3),
    #94a6c1,
    #778daf,
    #5f728f
  );
  border-radius: 8px;
  margin: 0 0.5em;
  box-shadow: inset 0 0 8px 0 #0005;
  cursor: pointer;
  transition: 0.5s ease;
}
.main_actions > *:hover {
  background-position: center top;
}
.main_actions span {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0 2px;
}
.main_actions > * > img {
  width: 100%;
  height: 50%;
  margin: 10% 0;
  object-fit: contain;
}
</style>