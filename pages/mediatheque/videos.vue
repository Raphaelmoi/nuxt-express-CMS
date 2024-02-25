<template>
  <div>
    <header class="header_site">
      <div>
        <h1>Videos</h1>
      </div>
    </header>
    <div class="page_content stickyFb">
      <div class="filtersBar">
        <div class="btnsDate">
          <nuxt-link class="active" to="/image-uploader"
            >Ajouter des images</nuxt-link
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
            Nouvelles images en 1er
          </div>
          <div :class="date_filter ? 'active' : null">+ anciennes en 1er</div>
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
            style="background: #b71c1c; border-color: #b71c1c; color: white"
          >
            Supprimer la sélection
          </div>
        </div>

        <div class="elsQtt">{{ total_qtt }} éléments</div>
      </div>
    </div>

    <!-- <div class="page_content">
      <div class="grid_img">
        <div v-for="i in api_imgs" :key="i.id" class="card_listing">
          <label class="check">
            <input
              type="checkbox"
              @change="toggleOnDeleteArray(i)"
              :checked="is_checked(i)"
            />
            <span class="checkmark"></span>
          </label>

          <nuxt-link :to="`/image-uploader/${i.id}`">
            <img
              class="up_img"
              :src="i.vignette"
              :srcset="i.images"
              alt="image default"
              sizes="300px"
              :style="{
                'object-fit': i.metadata.fit,
              }"
            />
          </nuxt-link>
        </div>
      </div>

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

       -->
  </div>
</template>

<script>
import FormData from "form-data";

export default {
  data() {
    return {
      date_filter: false,
      api_imgs: null,
      total_qtt: 0,
      currentpage: 0,
      items_by_page: "10",
      items_to_delete: []
    };
  },
  async fetch() {
    let data = new FormData();
    data.append("currentpage", this.currentpage);
    data.append("items_by_page", this.items_by_page);
    data.append("reverse", this.date_filter);
    data.append("table", "db_images");

    this.$axios.post("/api/get/", data).then(res => {
      this.api_imgs = res.data.result;
      this.total_qtt = res.data.nbrItems;
    });
  },
  fetchOnServer: false,
  activated() {
    this.$fetch();
  },

  mounted() {},
  computed: {
    nbr_of_pages: {
      get() {
        if (this.api_imgs) {
          const pages = Math.ceil(this.total_qtt / this.items_by_page);
          return pages;
        } else return 1;
      }
    }
  },
  methods: {
    toggleOnDeleteArray(item) {
      const position = this.items_to_delete.findIndex(el => el.id === item.id);
      if (position === -1) {
        this.items_to_delete.push({ id: item.id, time: item.time });
      } else this.items_to_delete.splice(position, 1);
    },
    is_checked(item) {
      const position = this.items_to_delete.findIndex(el => el.id === item.id);
      if (position !== -1) {
        return true;
      }
      return false;
    },
    deleteSelection() {
      let deleted_file = 0;
      if (
        confirm(
          "Etes vous sûre de vouloir supprimer ce(s) fichier(s) (" +
            this.items_to_delete.length +
            " fichier(s))"
        )
      ) {
        for (let i = 0; i < this.items_to_delete.length; i++) {
          const el = this.items_to_delete[i];
          let data = new FormData();
          data.append("table", "db_images");
          data.append("id", el.id);
          data.append("time", el.time);

          this.$axios.post("/api/delete", data).then(sur_res => {
            deleted_file++;
            if (deleted_file === this.items_to_delete.length) {
              this.$fetch();
              this.items_to_delete = [];
              this.$store.commit("addMessage_to_user", {
                val: `<b> ${deleted_file} fichier(s) suprimé(s)</b>`,
                duration: 3000
              });
            }
          });
        }
      }
    }
  }
};
</script>
<style>
</style>