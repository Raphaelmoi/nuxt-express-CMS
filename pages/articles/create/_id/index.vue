<template>
  <div>
    <div class="filtersBar">
      <div class="btnsDate">
        <!-- <nuxt-link class="active" to="/image-uploader"
              >Ajouter des images</nuxt-link
            > -->
        <nuxt-link to="/articles" class="active"> Retour</nuxt-link>
      </div>
    </div>

    <div class="CreateArtPage">
      <div>
        <div class="pageblock categories">
          <h2>Catégories</h2>
          +
          <div>
            <section
              class="btnsDate"
              v-for="(i, index) in filters"
              :key="index"
            >
              {{ i.name }}
            </section>
          </div>
        </div>

        <!-- <label for="cat">Catégories</label>
      <select name="cat" id="cat" v-model="article.categorie">
        <option
          name="cat"
          v-for="(i, index) in filters"
          :key="index"
          :value="i.name"
        >
          {{ i.name }}
        </option>
      </select> -->

        <div class="pageblock inputblock column">
          <label>Titre</label>
          <input type="text" v-model="article.titre" />
        </div>

        <div class="pageblock inputblock column">
          <label for="">Description courte</label>
          <input type="text" v-model="article.desc1" />
        </div>
        <div class="pageblock inputblock column">
          <label for="">Description longue</label>
          <!-- <input type="text" v-model="article.desc2" /> -->
          <textarea name="" id="" rows="5" v-model="article.desc2"></textarea>
        </div>
        <div class="pageblock inputblock column">
          <label for="">L'article</label>
          <client-only>
            <!-- <Tiptap v-model="article.content" /> -->
          </client-only>
        </div>

        <div class="pageblock inputblock column">
          <label for="">Créateur de l'article</label>
          <input type="text" v-model="article.createur" />
        </div>
        <div class="pageblock inputblock column">
          <div>
            <label for="">images</label>
            <input type="text" v-model="article.images" />
          </div>
          <div>
            <label for="">videos</label>
            <input type="text" v-model="article.videos" />
          </div>
          <div>
            <label for="">files</label>
            <input type="text" v-model="article.files" />
          </div>
        </div>
      </div>
      <aside>
        <div>
          <label for="">is_online</label>
          <input type="text" v-model="article.is_online" />
        </div>
        <div>
          <label for="">date_crea</label>
          <input type="text" v-model="article.date_crea" />
        </div>
        <div>
          <label for="">date_modif</label>
          <input type="text" v-model="article.date_modif" />
        </div>

        <div>
          <label for="">categorie</label>
          <input type="text" v-model="article.categorie" />
        </div>

        <div @click="sendNewArticle">click</div>
      </aside>
    </div>
  </div>
</template>

<script>
import FormData from "form-data";

export default {
  data() {
    return {
      item_id: null /**seulemnt si on modifie sinon null */,
      date_filter: false,
      api_data: null,
      total_qtt: 0,
      currentpage: 0,
      items_by_page: "10",
      filters: "",

      article: {
        titre: "",
        desc1: "",
        desc2: "",
        content: "",
        images: "",
        videos: "",
        files: "",
        date_crea: "",
        date_modif: "",
        createur: "",
        categorie: "",
        is_online: "1",
      },
    };
  },
  activated() {
    this.$fetch();
  },

  fetchOnServer: false,
  async fetch() {
    let data_filters = new FormData();
    data_filters.append("table", "db_articles_cat");
    this.$axios.post("/api/get", data_filters).then((res) => {
      console.log(res);
      this.filters = res.data.result;
    });
    this.item_id = this.$route.params.id;
    if (this.item_id !== "new") {
      let data = new FormData();
      data.append("table", "db_articles");
      data.append("where", ` id = '${this.item_id}'`);

      this.$axios.post("/api/get", data).then((res) => {
        this.article = res.data.result[0];
      });
    }
  },

  mounted() {},

  methods: {
    sendNewArticle() {
      // update
      if (this.article.id) {
        let data = new FormData();
        let toUpdate = JSON.stringify(this.article);
        data.append("to_update", toUpdate);
        data.append("table", "db_articles");
        data.append("id", this.article.id);

        this.$axios.post("/api/update", data).then((res) => {
          console.log(res);
        });
      } else {
        // create
        this.article.date_crea = new Date().getTime();
        this.article.date_modif = new Date().getTime();
        let data = new FormData();
        let toSet = JSON.stringify(this.article);
        data.append("to_set", toSet);
        data.append("table", "db_articles");
        this.$axios.post("/api/set", data).then((res) => {
          console.log(res);
        });
      }
    },
  },
};
</script>
<style>
.CreateArtPage {
  margin-top: 1em;
  display: flex;
}
.CreateArtPage > div {
  flex: 1;
}
.CreateArtPage > aside {
  width: 300px;
  margin-left: 1em;
  background: #ccc;
}

.pageblock {
  background: #eee;
  padding: 1em;
  border-radius: 8px;
  margin: 1em 0;
}
.pageblock h2 {
  margin: 0 0 1em;
  text-transform: uppercase;
}
.categories div {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1em;
  gap: 1em;
  grid-auto-flow: row dense;
  grid-auto-rows: 50px;
}
.categories article {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
  border: 2px var(--color-1) solid;
}
.categories article.active {
  background: var(--color-2);
}

.inputblock {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.inputblock label {
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 1em;
}
.inputblock textarea,
.inputblock input {
  flex: 1;
  padding: 0.7em 1em;
  font-size: 1.2em;
  border: none;
  border-radius: 8px;
}
.inputblock.column {
  flex-direction: column;
  align-items: stretch;
}
.inputblock.column label {
  margin-bottom: 0.5em;
}
</style>