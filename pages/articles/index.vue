<template>
  <div class="category_art">
    <header class="header_site">
      <div>
        <h1>Gestion des articles</h1>
      </div>
    </header>

    <!-- <div class="ca_title">
      <h2>Gestion des articles</h2>
        <nuxt-link to="/articles/create" class="btn">
          Créer un article</nuxt-link
        >  
    </div>  -->
    <div class="page_content">
      <div class="manager">
        <div class="filters_search">
          <div class="filters">
            <p class="active">Tous <span>112</span></p>
            <p>Brouillons <span>18</span></p>
            <p>Desactivé <span>4</span></p>
          </div>

          <div class="search">
            <input type="text" placeholder="Rechercher" />
          </div>
        </div>

        <div class="filtersBar">
          <div class="btnsDate">
            <!-- <nuxt-link class="active" to="/image-uploader"
              >Ajouter des images</nuxt-link
            > -->
            <nuxt-link to="/articles/create/new" class="active">
              Créer un article</nuxt-link
            >
          </div>
          <div
            class="btnsDate"
            @click="
              date_filter = !date_filter;
              $fetch();
            "
          >
            <div :class="!date_filter ? 'active' : null">
              Plus récent en 1er
            </div>
            <div :class="date_filter ? 'active' : null">+ anciens en 1er</div>
          </div>

          <div class="selectQtt">
            <label for="qtt-slect">Éléments visible&nbsp;&nbsp; </label>
            <select
              name="qq"
              id="qtt-slect"
              v-model="items_by_page"
              @change="$fetch"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div class="btnsDate" v-if="items_to_delete.length">
            <div
              @click="deleteSelection()"
              style="background: #b71c1c; border-color: #b71c1c"
            >
              Supprimer la sélection
            </div>
          </div>

          <div style="font-size: 0.9em">{{ total_qtt }} éléments</div>
        </div>
      </div>
    </div>

    <div class="page_content">
      <div class="ca_list">
        <div class="head">
          <div>
            <input type="checkbox" />
            <label>Titre</label>
          </div>
          <div>
            <p>Catégories</p>
          </div>
          <div>
            <p>Créateur</p>
          </div>
          <div>
            <p>Création</p>
          </div>
          <div>
            <p>Modification</p>
          </div>
          <div>
            <p>Commentaire</p>
          </div>
          <div>
            <p>Status</p>
          </div>
        </div>
        <!-- ::::::::::::::::::::::::::::::::::::::::::::::::::::::: -->
        <div class="ca_item" v-for="item in api_data" :key="item.id">
          <div>
            <input type="checkbox" />
            <nuxt-link :to="`/articles/create/${item.id}`">{{
              item.titre
            }}</nuxt-link>
          </div>
          <div>
            <p>{{ item.categorie }}</p>
          </div>
          <div>
            <p>{{ item.createur }}</p>
          </div>
          <div>
            <p>{{ timeStampToHuman(item.date_crea) }}</p>
          </div>
          <div>
            <p v-show="item.date_crea !== item.date_modif">
              {{ timeStampToHuman(item.date_modif) }}
            </p>
          </div>
          <div>
            <p>Commentaire</p>
          </div>
          <div>
            <p>{{ item.is_online }}</p>
          </div>
        </div>
      </div>
      <!-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
      <!-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
      <!-- $$$   PAGINATION   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
      <div class="">
        <div class="pagination" v-if="nbr_of_pages > 1">
          <div
            :class="currentpage - 1 < 0 ? 'noclick' : null"
            @click="
              currentpage -= 1;
              $fetch();
            "
          >
            <i class="arrow arrow-left"></i>
          </div>
          <div
            v-for="index in nbr_of_pages"
            :class="currentpage == index - 1 ? 'active' : null"
            :key="index"
            @click="
              currentpage = index - 1;
              $fetch();
            "
          >
            {{ index }}
          </div>
          <div
            :class="currentpage + 1 >= nbr_of_pages ? 'noclick' : null"
            @click="
              currentpage += 1;
              $fetch();
            "
          >
            <i class="arrow arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/mixin/utils.vue";

export default {
  mixins: [utils],
  data() {
    return {
      date_filter: "false",
      api_data: null,
      total_qtt: 0,
      currentpage: 0,
      items_by_page: "5",
      filters: "",
      items_to_delete: []
    };
  },
  computed: {
    nbr_of_pages: {
      get() {
        if (this.api_data) {
          const pages = Math.ceil(this.total_qtt / this.items_by_page);
          return pages;
        } else return 1;
      }
    }
  },

  async fetch() {
    let data = {
      table: "db_articles",
      currentpage: this.currentpage,
      items_by_page: this.items_by_page,
      reverse: this.date_filter.toString()
      // where: "id='1' AND titre = 't'"
    };
    await this.$axios
      .post("/api/get", data)
      .then(res => {
        console.log(res);
        this.api_data = res.data.result;
        this.total_qtt = res.data.nbrItems;
      })
      .catch(err => console.log(err));
    // recupération des filtres
    await this.$axios
      .post("/api/get", { table: "db_articles_cat" })
      .then(res => {
        console.log(res);
        this.filters = res.data.result;
      });
  },

  mounted() {},

  methods: {}
};
</script>
<style>
.category_art {
  /* margin-right: 1rem; */
}
.ca_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 2rem;
}
.category_art h2 {
  text-transform: uppercase;
}
.category_art .ca_list > div {
  display: flex;
}
.category_art .head {
  background: var(--clear-1);
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.9em;
}
.category_art .ca_list > div > * {
  flex: 1;
  display: flex;
  align-items: center;
}
.category_art .ca_list > div > *:first-child {
  flex: 2;
}
.ca_list input {
  width: 20px;
  height: 20px;
  margin: 0 1rem;
}
.ca_list p {
  margin: 4px 0;
}
.category_art .ca_item {
  transition: 0.5s ease;
}
.category_art .ca_item:nth-child(even) {
  background: #f0f0f0;
}
.category_art .ca_item:hover {
  background: var(--clear-3);
}

/* -------------------------------------------------- */
.manager .filters_search {
  display: flex;
  justify-content: space-between;
  margin-right: 2rem;
}
.manager .filters {
  display: flex;
  align-items: center;
}
.manager .filters > * {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  font-size: 0.9em;
}
.manager .filters .active {
  font-weight: bold;
}
.manager .filters span {
  background: var(--clear-2);
  border-radius: 4px;
  min-width: 40px;
  display: block;
  text-align: center;
  margin-left: 4px;
  font-size: 0.9em;
}
.manager .search input {
  background: var(--clear-2);
  padding: 1em;
  width: 300px;
  border: none;
  border-radius: 4px;
  outline-color: var(--clear-2);
}
.manager .search ::placeholder {
  color: #333;
}
</style>