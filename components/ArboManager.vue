<template>
  <div class="directories_comp">
    <div v-if="directories" :key="directories.length">
      <div
        class="up_category"
        v-for="(i, index) in active_path.slice(1)"
        :key="`${i}k`"
        @click="setLevelDepth(index + 1, i)"
        :style="`padding-left: ${index * 10}px; `"
      >
        <span></span>
        {{ i }}
      </div>
      <div v-for="(i, index) in filteredDirectories" :key="index">
        <div
          v-if="!Number.isInteger(+i[depth + 1])"
          class="item_category"
          @click="goInsideFolder(i)"
        >
          {{ i[depth + 1] }}
        </div>
        <!-- <div v-else class="item_category">
          image
        </div> -->
      </div>
      <div
        class="item_category tac"
        style="
          font-size: 0.65em;
          padding: 1em 0;
          background: #ddd;
          cursor: default;
        "
        v-if="!showNewFoldInput"
      >
        Vos fichiers seront ajoutés dans le dossier
        <span style="color: red">{{ currentfolder }}</span>
      </div>
      <div
        class="item_category tac inputfolder"
        style="font-size: 0.7rem"
        v-else
      >
        <input
          type="text"
          v-model="newfolder_name"
          placeholder="Votre nouveau dossier"
          v-on:keyup.enter="setNewFolder()"
        />
        <div @click="setNewFolder()" class="pointer">Créer</div>
      </div>

      <div
        class="item_category tac pointer addFolder"
        @click="showNewFoldInput = !showNewFoldInput"
      >
        <span v-if="showNewFoldInput">Annuler</span>
        <span v-else> + Créer un nouveau dossier</span>
      </div>
    </div>
  </div>
</template>


<script>
import FormData from "form-data";

export default {
  data() {
    return {
      directories: null,
      fullpath: null,
      depth: 1,
      currentfolder: "images",
      active_path: ["upload", "images"],
      newfolder_name: "",
      showNewFoldInput: false
    };
  },
  computed: {
    filteredDirectories: {
      get() {
        if (this.directories[this.depth]) {
          return this.directories[this.depth].filter(el => {
            let t = true;
            for (let i = 0; i < this.active_path.length; i++) {
              if (el[i] !== this.active_path[i]) {
                t = false;
              }
            }
            return t;
          });
        }
      }
    }
  },
  async fetch() {
    var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    let data = new FormData();
    data.append("filePath", "upload/");
    try {
      await this.$axios.post("/api/folderManager", data).then(res => {
        let stamp_array = [];
        let data = [...res.data];
        data.forEach((el, index) => {
          this.fullpath = el.split("upload")[0];
          let splited_path = el
            .split(this.fullpath)
            .join("")
            .split("/");
          stamp_array.push(splited_path);
        });
        this.directories = Object.values(groupBy(stamp_array, "length"));
      });
    } catch (err) {
      this.$store.commit("addMessage_to_user", {
        val: `<b>Un problème est survenu avec le fichier ${file.name}.</b> <br/>  Vérifier l'extension de votre fichier (sont acceptés : jpg, png, svg, webp, tiff).`,
        duration: 100000,
        type: "error"
      });
    }
  },

  methods: {
    goInsideFolder(item) {
      this.currentfolder = item[this.depth + 1];
      this.depth++;
      this.active_path[this.depth] = item[this.depth];
      if (!this.directories[this.depth]) {
        this.directories[this.depth] = [this.active_path];
      }
      this.$parent.folder_path = this.active_path.join("/") + "/";
    },
    setLevelDepth(i, title) {
      this.active_path.length = i + 1;
      this.depth = this.active_path.length - 1;
      this.currentfolder = title;
      this.$parent.folder_path = this.active_path.join("/") + "/";
    },
    setNewFolder() {
      if (this.newfolder_name !== "") {
        if (Number.isInteger(+this.newfolder_name)) {
          this.$store.commit("addMessage_to_user", {
            val: `<b>Le nom du nouveau dossier ne doit pas être un chiffre</b> `,
            duration: 5000
          });
        } else {
          let a = "";
          this.active_path.forEach(element => {
            a += element + "/";
          });
          let data = new FormData();
          data.append("filePath", a + this.newfolder_name);
          this.$axios.post("/api/folderManager/create", data).then(res => {
            this.$fetch();
            this.showNewFoldInput = false;
            this.$store.commit("addMessage_to_user", {
              val: `<b>Nouveau dossier ${this.newfolder_name} créé.</b> `,
              duration: 5000
            });
          });
        }
      }
    }
  }
};
</script>

<style>
.directories_comp {
  padding: 2em 1em;
}
.directories_comp > div {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 8px #0003;
}
.up_category {
  background: var(--clear-1);
  padding: 4px 0;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
}
.up_category span {
  width: 7px;
  height: 7px;
  background: var(--clear-3);
  border-radius: 5px;
  margin: 0 6px;
}
.item_category {
  padding: 4px;
  background: #eee;
  transition: 0.3s ease;
  cursor: pointer;
}
.item_category:hover {
  background: #ddd;
}
.item_category.addFolder {
  background: var(--tile-gradiant-2);
  background-size: 150% auto;
  background-position: center right;
  color: white;
  box-shadow: inset 0 -2px 2px 2px #0001;
}
.item_category.addFolder:hover {
  background-position: center left;
}
.inputfolder {
  display: flex;
  align-items: center;
  padding: 4px 8px;
}
.inputfolder div {
  border: 1px var(--clear-1) solid;
  border-radius: 4px;
  padding: 4px 8px;
  text-transform: uppercase;
  background: var(--clear-1);
  color: white;
  margin-left: 8px;
}
.inputfolder input {
  flex: 1;
  padding: 4px;
}
</style>
