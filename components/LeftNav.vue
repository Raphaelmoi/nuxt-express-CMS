<template>
  <aside class="leftnav">
    <div class="profile">
      <img src="/img/ape.jpg" />
      <div>pseudo <br />lien URL site</div>
    </div>
    <div class="menu">
      <nuxt-link class="menu_base" to="/">Accueil </nuxt-link>
      <div
        class="menu_base"
        @click="menu_open = 1"
        :class="menu_open === 1 ? 'open' : null"
      >
        <div class="fakelink">
          Médiatheque <i class="arrow arrow-right"></i>
        </div>
        <div class="menu_sec">
          <nuxt-link to="/mediatheque">La médiatheque</nuxt-link>
          <nuxt-link to="/mediatheque/images">Images</nuxt-link>
          <nuxt-link to="/mediatheque/videos">Vidéos </nuxt-link>
          <nuxt-link to="/mediatheque/docs">Autres </nuxt-link>
        </div>
      </div>
      <nuxt-link class="menu_base" to="/articles">Articles </nuxt-link>

      <div
        class="menu_base"
        @click="menu_open = 3"
        :class="menu_open === 3 ? 'open' : null"
      >
        <div class="fakelink">Produits <i class="arrow arrow-right"></i></div>
        <div class="menu_sec">
          <nuxt-link to="/produits">Tous les produits </nuxt-link>
          <nuxt-link to="/produits/chaussettes">Chaussettes </nuxt-link>
          <nuxt-link to="/produits/occasions">Occasions...</nuxt-link>
        </div>
      </div>
      <nuxt-link class="menu_base" to="/boutique"
        >Boutique / points de ventes
      </nuxt-link>

      <nuxt-link class="menu_base" to="/mon-compte">Mon compte </nuxt-link>
      <nuxt-link class="menu_base" to="/login">Login</nuxt-link>
    </div>
  </aside>
</template>


<script>
export default {
  data() {
    return {
      menu_open: 0
    };
  }
};
</script>

<style>
.layout_skeleton .leftnav {
  width: 250px;
  background: var(--clear);
  background: linear-gradient(
    295deg,
    var(--clear-1),
    var(--clear-1),
    var(--clear-3),
    var(--clear-1)
  );
  background-size: 120%;
  color: var(--clear-bg-txt);
  position: sticky;
  z-index: 1;
  top: 0;
  height: 100vh;
  box-shadow: 5px 0 10px 0 #7775;
}
.layout_skeleton .leftnav a {
  color: var(--clear-bg-txt);
  text-decoration: none;
}
.profile {
  display: flex;
  align-items: center;
  padding: 1em 0.5em 1em 0.5em;
}
.profile img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1em;
  border: 4px var(--clear-4) solid;
  border-right-color: var(--clear-2);
  border-left-color: var(--clear-2);
}
.menu .fakelink,
.menu a {
  width: calc(100% - 2em);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em;
  cursor: pointer;
  transition: 0.5s ease;
}
.menu .fakelink:hover,
.menu a:hover {
  /* background: var(--clear); */
  /* background-position: left center;  */
}
.menu_base {
  background: var(--clear-3);
  background-size: 150% 125%;
  background-position: center bottom; /* change the direction of the change here */
  background-image: linear-gradient(
    176deg,
    #d3deed,
    var(--clear-3),
    #94a6c1,
    #778daf,
    #5f728f
  );
}
.menu_base:hover {
  background-position: center top; /* change the direction of the change here */
}
.menu_sec {
  background: var(--clear-2);
  display: none;
}
.menu_base.open .menu_sec {
  display: block;
}
.menu_sec a {
  background: rgb(216 225 237);
}
.menu_sec a.nuxt-link-exact-active,
.menu_sec a:hover {
  background: var(--clear-3);
}
.menu_base.open .fakelink {
  background: var(--clear-1);
  background-image: linear-gradient(
    46deg,
    #d3deed,
    var(--clear-3),
    #94a6c1,
    #778daf,
    #5f728f
  );
  background-size: 150% auto;
  background-position: right center;
}
.menu .nuxt-link-exact-active {
  box-shadow: inset 0 0 0 0 #0003;
  position: relative;
  width: calc(100% - 0.5em);
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  transition: 0.5s;
}
.menu .nuxt-link-exact-active:hover {
  pointer-events: none;
}
</style>
