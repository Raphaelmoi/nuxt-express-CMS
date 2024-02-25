<template>
  <div>
    <header class="header_site">
      <div v-if="api_img">
        <span v-for="i in fullPath" :key="i"> {{ i }} / </span>
        <span style="font-weight: bold">
          <input type="text" v-model="api_img.name" />
        </span>
      </div>
    </header>
    <div class="page_content" v-if="api_img">
      <div class="flex wrap full">
        <div class="smlBtn">
          <nuxt-link to="/mediatheque/images" class="flex middleAlign wrap">
            <i class="arrow arrow-left me24"></i>
            Toutes les images</nuxt-link
          >
        </div>
        <div class="smlBtn">
          <nuxt-link to="/image-uploader" class="active"
            >Ajouter d'autres images</nuxt-link
          >
        </div>

        <div
          class="smlBtn"
          @click="
            showBtnUpdate = true;
            showImagePosition = !showImagePosition;
          "
        >
          <div>Définir point principale de l'image</div>
        </div>
        <div class="active">
          <div @click="deleteImg()" class="smlBtn">
            <div>Supprimer l'image</div>
          </div>
        </div>
        <div v-if="showBtnUpdate" class="active smlBtn autoML">
          <div @click="updateImg()">Mettre à jour</div>
        </div>
      </div>
    </div>

    <div class="page_content" v-if="api_img">
      <div class="inputDiv">
        Format : {{ api_img.metadata.format }} <br />
        Longeur : {{ api_img.metadata.width }}px <br />
        Hauteur : {{ api_img.metadata.height }}px <br />
      </div>

      <div class="inputDiv">
        <label for="">description :</label>
        <textarea
          type="text"
          v-model="api_img.description"
          @input="showBtnUpdate = true"
        />
      </div>

      <!-- <div class="inputDiv">
        <label for="">mot clefs :</label>
        <textarea type="text" v-model="api_img.keywords" />
      </div> -->
    </div>
    <section class="imagePage">
      <div></div>

      <div class="imagecontainer">
        <div class="image_manager" v-if="api_img" @click="setImagePosition">
          <div
            v-if="showImagePosition"
            class="point_position"
            :style="{ top: image_position.y, left: image_position.x }"
          ></div>
          <!-- <img
            v-if="api_img.images"
            :src="api_img.vignette"
            :srcset="api_img.images"
            :alt="api_img.description"
            :sizes="`${api_img.metadata.width}px`"
         
            class="up_img"
          /> -->
          <img
            v-if="api_img.vignette"
            :src="api_img.vignette"
            :alt="api_img.description"
            class="up_img"
            :style="{
              width: api_img.metadata.width + 'px',
            }"
          />
        </div>
      </div>
      <!-- {{ api_img }} -->
    </section>
  </div>
</template>

<script>
import FormData from "form-data";

export default {
  data() {
    return {
      api_img: null,
      image_position: { x: "50%", y: "50%" },
      new_name: null,
      showBtnUpdate: false,
      showImagePosition: false
    };
  },
  mounted() {
    if (this.$route.params.slug) this.getCurrentImg(this.$route.params.slug);
  },
  computed: {
    fullPath: {
      get() {
        return this.api_img.vignette
          .split("/")
          .filter(
            el =>
              this.api_img.time != el &&
              this.api_img.name != el &&
              el != "" &&
              el != "upload"
          );
      }
    }
  },
  methods: {
    updateImg() {
      let data = new FormData();
      let toUpdate = JSON.stringify({
        css: this.api_img.css,
        position: JSON.stringify(this.image_position),
        description: this.api_img.description,
        name: this.new_name || this.api_img.name
      });
      data.append("to_update", toUpdate);
      data.append("table", "db_images");
      data.append("id", this.api_img.id);

      this.$axios
        .post("/api/update", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(sur_res => {
          this.getCurrentImg(this.api_img.id);
        });
    },
    deleteImg() {
      let data = new FormData();
      data.append("table", "db_images");
      data.append("id", this.api_img.id);
      data.append("time", this.api_img.time);

      this.$axios
        .post("/api/delete", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(sur_res => {
          this.$router.push({
            path: "/mediatheque/images"
          });
        });
    },
    getCurrentImg(id) {
      let data = new FormData();
      data.append("table", "db_images");
      data.append("where", ` id = '${id}'`);

      this.$axios.post("/api/get", data).then(res => {
        this.api_img = res.data.result[0];
        this.api_img.metadata = JSON.parse(this.api_img.metadata);
        console.log(this.api_img.metadata);
        if (JSON.parse(this.api_img.position)) {
          console.log("reparse");
          this.image_position = JSON.parse(this.api_img.position);
        }
      });
    },
    setImagePosition(e) {
      if (this.showImagePosition) {
        var rect = e.target.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        this.image_position.x = x.toFixed(2) + "%";
        this.image_position.y = y.toFixed(2) + "%";
        this.api_img.css =
          "object-position:" +
          this.image_position.x +
          ", " +
          this.image_position.y +
          "; ";
      }
    }
  }
};
</script>
<style>
.imagePage {
  display: flex;
}

.imagePage > section {
  flex: 1;
}
.imagePage > aside {
  width: 300px;
  margin-left: 1em;
  padding: 1em;
}
.imagecontainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image_manager {
  /* background: #0052; */
  max-height: 94vh;
  max-width: 100%;
  margin: 1rem 0;
  position: relative;
  overflow: hidden;
}
.image_manager .up_img {
  /* background: lightblue; */
  object-fit: contain;
  max-height: 94vh;
  max-width: 100%;
}
.image_manager .point_position {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgb(187, 11, 11);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: 0 0 0 2px #fff9;
}
.inputDiv {
  margin: 1em 0;
}
.inputDiv textarea {
  width: calc(100% - 1em);
  height: 80px;
  font-family: inherit;
}
.inputDiv label {
  text-transform: uppercase;
  font-weight: bold;
}
</style>