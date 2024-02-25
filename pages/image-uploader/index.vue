<template>
  <div style="display: flex">
    <div style="width: 300px">
      <ArboManager />
    </div>
    <div style="flex: 1">
      <div class="image_uploader_page" id="dropContainer" v-show="!is_sending">
        <h3>Charger une ou plusieurs images</h3>
        <p>
          Déposez les fichiers sur la page <b>ou</b> cherchez les via le bouton
        </p>

        <br />
        <label for="sampleFile" class="btn-gradient">
          Choisir un fichier
        </label>

        <input
          type="file"
          id="sampleFile"
          name="sampleFile"
          multiple="multiple"
          accept="image/*"
          @change="loadImage"
        />
      </div>
      <div class="image_uploader_page" v-show="is_sending">
        <p
          style="font-size: 1.3em; font-weight: 700; text-transform: uppercase"
        >
          Chargement des images en cours...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import FormData from "form-data";

export default {
  name: "image_uploader",
  data() {
    return {
      api_img: null,
      is_sending: false,
      folder_path: "upload/images/"
    };
  },
  mounted() {
    this.manageDropEvent();
  },

  methods: {
    manageDropEvent() {
      let dropContainer = document.getElementById("dropContainer");
      dropContainer.ondragover = dropContainer.ondragenter = evt => {
        evt.preventDefault();
        dropContainer.classList.add("dragging");
      };
      dropContainer.ondrop = evt => {
        if (evt.dataTransfer.files) {
          document.getElementById("sampleFile").files = evt.dataTransfer.files;
          dropContainer.classList.remove("dragging");
          this.loadImage();
        }
        evt.preventDefault();
      };
    },
    async loadImage() {
      const files = document.getElementById("sampleFile").files;
      let addedImg = 0;
      this.is_sending = true;
      //   console.log(e.srcElement.files);
      //   const file = e.srcElement.files[0];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);
        let data = new FormData();
        data.append("sampleFile", file, file.name);
        data.append("filePath", this.folder_path);

        try {
          const response = await this.$axios
            .post("/api/uploadImage", data, {
              headers: {
                accept: "application/json",
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`
              }
            })
            .then(sur_res => {
              addedImg++;
              this.$store.commit("addMessage_to_user", {
                val: `<b> ${addedImg} / ${files.length} fichier(s) envoyé(s)</b>`,
                duration: 3000
              });
              if (addedImg === files.length) {
                this.$router.push({
                  path: "/image-uploader/" + sur_res.data
                });
                this.$store.commit("addMessage_to_user", {
                  val: `Vos fichiers sont téléchargés.`,
                  duration: 300
                });
                this.is_sending = false;
              }
            });
        } catch (err) {
          addedImg++;
          console.log(err);

          this.$store.commit("addMessage_to_user", {
            val: `<b>Un problème est survenu avec le fichier ${file.name}</b> <br/>  Vérifier l'extension de votre fichier (sont acceptés : jpg, png, svg, webp, tiff).`,
            duration: 100000
          });
          this.is_sending = false;
        }
      }
    }
  }
};
</script>
<style>
.image_uploader_page {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.image_uploader_page.dragging {
  background: var(--tile-gradiant-2);
  background-size: 150%;
  background-position: left center;
  animation: draganim 2s ease-out;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
@keyframes draganim {
  to {
    background-position: right center;
  }
}
.image_uploader_page h3 {
  text-transform: uppercase;
  font-size: 2em;
  margin: 0;
}
.image_uploader_page input {
  border: none;
}

input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 4px solid var(--color-1);
  display: inline-block;
  padding: 12px 2em;
  cursor: pointer;
  transition: 0.5s ease;
  text-transform: uppercase;
  font-weight: 600;
}
.custom-file-upload:hover {
  background: var(--color-3);
}
</style>