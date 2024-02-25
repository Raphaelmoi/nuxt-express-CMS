<template>
  <div class="pageConnect">
    <section class="">
      <div class="navPanel">
        <div :class="view == 0 ? 'active' : null" @click="view = 0">
          Se connecter
        </div>
        <div :class="view == 1 ? 'active' : null" @click="view = 1">
          S'inscrire
        </div>
      </div>
      <!-- ========================================================================================================== -->
      <!-- - SE CONNECTER    ---------------------------------------------------------------------------------------- -->
      <!-- ========================================================================================================== -->
      <form action="" class="panelConnect" v-show="view == 0">
        <div class="titrePanel">Se connecter</div>

        <div class="inputBloc">
          <label for="user">Email</label>
          <input type="email" name="user" id="user" v-model="signin.email" />
        </div>
        <div class="inputBloc">
          <label for="pass">Mot de passe</label>
          <input
            type="password"
            name="pass"
            id="pass"
            v-model="signin.password"
          />
          <div class="forgottenPass pointer" @click="view = 2">
            Mot de passe oublié ?
          </div>
        </div>
        <nuxt-link class="btn-gradient" @click.native="connect" to="/"
          >Se connecter</nuxt-link
        >
      </form>
      <!-- ========================================================================================================== -->
      <!-- S'INSCRIRE       ----------------------------------------------------------------------------------------- -->
      <!-- ========================================================================================================== -->
      <form action="" class="panelConnect" v-show="view == 1">
        <div class="titrePanel">S'inscrire</div>
        <div class="inputBloc">
          <label for="user-up">Email</label>
          <input
            type="email"
            name="user-up"
            id="user-up"
            v-model="signup.email"
          />
        </div>
        <div class="inputBloc">
          <label for="pass_up">Mot de passe</label>
          <input
            type="password"
            name="pass_up"
            id="pass_up"
            v-model="signup.password"
          />
        </div>
        <div class="inputBloc">
          <label for="pass_up_confirm">Confirmer le mot de passe</label>
          <input
            type="password"
            name="pass_up_confirm"
            id="pass_up_confirm"
            v-model="signup.password_confirm"
          />
        </div>
        <div class="inputBloc">
          <label for="user-up">Token du site</label>
          <input
            type="email"
            name="user-up"
            id="user-up"
            v-model="signup.tokenSite"
          />
          <div class="forgottenPass">
            Seul l'administrateur du site peux vous fournir cette clé.
          </div>
        </div>
        <div class="btn-gradient">S'inscrire</div>
      </form>
      <!-- ========================================================================================================== -->
      <!-- MOT DE PASSE OUBLIE        ------------------------------------------------------------------------------- -->
      <!-- ========================================================================================================== -->
      <form action="" class="panelConnect" v-show="view == 2">
        <div class="titrePanel">Mot de passe oublié</div>
        <div class="inputBloc">
          <label for="user-up">Email</label>
          <input
            type="email"
            name="user-up"
            id="user-up"
            v-model="signup.email"
          />
        </div>
        <div class="btn-gradient">Récupérer mon mot de passe</div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: 0,
      signin: {
        email: null,
        password: null
      },
      signup: {
        email: null,
        password: null,
        password_confirm: null,
        tokenSite: null /**clé trouvable dans le compte de l'admin , donnant un accées à une création de compte avec un certain niveau de controle */
      }
    };
  },
  methods: {
    connect() {
      this.$store.commit("addMessage_to_user", {
        val: "Connexion réussie",
        duration: 3000,
        type: "success"
      });
    }
  }
};
</script>

<style>
.pageConnect {
  background-image: linear-gradient(
    0deg,
    #3c4450,
    #4f5c6e,
    #5f728f,
    #778daf,
    #94a6c1,
    var(--clear-3),
    #94a6c1,
    #778daf,
    #5f7290
  );
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pageConnect > section {
  background: radial-gradient(
    circle,
    var(--clear) 0%,
    var(--clear-3) 35%,
    #5f728f 100%
  );
  box-shadow: 0 0 20px 0 #0004;
  border-radius: 8px;
}
.panelConnect {
  padding: 1em;
  border-radius: 0 0 8px 8px;
  min-width: 500px;
}
.navPanel {
  display: flex;
  width: 100%;
  background: #0001;
}
.navPanel > div {
  flex: 1;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 0.5em 1em;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: 0.5s ease;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.navPanel > div:first-child {
  border-top-right-radius: 0;
}
.navPanel > div:last-child {
  border-top-left-radius: 0;
}
.navPanel > div:hover,
.navPanel .active {
  background: #0003;
  border-bottom: 2px solid var(--clear);
}
.titrePanel {
  text-align: center;
  margin: 0 0 1em;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 1.4em;
}
.inputBloc {
  margin-bottom: 1em;
}
.inputBloc label {
  display: block;
  font-weight: 600;
}
.inputBloc input {
  width: calc(100% - 2em);
  margin-top: 4px;
  padding: 0.8em 1em;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.7);
}

.forgottenPass {
  font-size: 0.8em;
  text-align: right;
  margin-top: 2px;
}
</style>