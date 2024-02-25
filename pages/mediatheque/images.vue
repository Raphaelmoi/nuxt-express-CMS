<template>
  <div>
    <header class="header_site">
      <div>
        <h1>Images</h1>
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
    <!-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
    <!-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
    <!-- $$$     LISTING    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
    <div class="page_content">
      <div class="grid_img" :key="$fetchState.pending">
        <div v-for="i in api_imgs" :key="i.id" class="card_listing">
          <!-- <input
          type="checkbox"
          @change="toggleOnDeleteArray(i)"
          :checked="is_checked(i)"
        /> -->

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
              class="up_img_blur"
              :src="i.vignette"
              alt="image default"
              width="20"
              height="20"
            />
            <img
              class="up_img"
              :src="i.vignette"
              alt="image default"
              sizes="300px"
            />
            <!-- <img
              class="up_img"
              :src="i.vignette"
              :srcset="i.images"
              alt="image default"
              sizes="300px"
              :style="{
                'object-fit': i.metadata.fit,
              }"
            /> -->
          </nuxt-link>
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
    let data = {
      currentpage: this.currentpage,
      items_by_page: this.items_by_page,
      reverse: this.date_filter.toString(),
      table: "db_images"
    };
    await this.$axios
      .post("/api/get/", data)
      .then(res => {
        this.api_imgs = res.data.result;
        this.total_qtt = res.data.nbrItems;
      })
      .catch(err => {
        console.log(err.response);
      });
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
          let data = {
            id: el.id,
            table: "db_images",
            time: el.time
          };

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
.grid_img {
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
  gap: 1em;
  grid-auto-flow: row dense;
  margin-bottom: 2em;
  grid-auto-rows: 300px;
}
.card_listing {
  /* width: 300px; */
  /* height: 300px; */
  position: relative;
  transition: 0.5s ease;
  max-height: 300px;
  overflow: hidden;
  /* background: #eee; */
}
.card_listing:hover {
  /* background: #eee; */
}
.card_listing input {
  position: absolute;
}
.card_listing .check {
  z-index: 1;
}
.card_listing img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
}
.card_listing .up_img_blur {
  object-fit: cover;
  /* z-index: 1; */
  position: absolute;
  filter: blur(10px);
  transform: scale(-1.2, -1.2);
}
.elsQtt {
  font-size: 0.8em;
}
.stickyFb {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>