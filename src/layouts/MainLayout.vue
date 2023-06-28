<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn color="primary" to="/" round unelevated>
          <q-avatar>
            <img src="../assets/icon-logo-100.svg" />
          </q-avatar>
        </q-btn>

        <q-toolbar-title> Aluga UFC </q-toolbar-title>
        <q-btn
          color="secondary"
          push
          class="q-mr-sm"
          label="Criar Anúncio"
          @click="createAd()"
        />
        <q-btn
          v-if="!isAuthenticated()"
          color="secondary"
          push
          icon="login"
          label="Login"
          to="/login"
        />
        <q-btn v-else color="white" round>
          <q-avatar>
            <img src="~assets/dog_profile.png" />
          </q-avatar>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Opções</div>
                <q-btn
                  color="primary"
                  push
                  label="Perfil"
                  icon="settings"
                  to="/users/update"
                />
                <q-btn
                  color="secondary"
                  push
                  class="q-mt-md"
                  icon="feed"
                  label="Criar Anúncio"
                  to="/products/create"
                />
                <q-btn
                  color="accent"
                  push
                  class="q-mt-md"
                  icon="list"
                  label="Meus Anúncios"
                  to="/products/my"
                />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="~assets/dog_profile.png" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md">
                  {{ user.fullName }}
                </div>
                <div class="text-caption text-grey-6 q-mb-md">
                  {{ user.email }}
                </div>

                <q-btn
                  style="min-width: 122px"
                  color="negative"
                  label="Logout"
                  icon="logout"
                  push
                  v-close-popup
                  @click="logout()"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import {
  isAuthenticated,
  logoutUser,
  getAuthUser,
} from "../utils/authentication";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    return {
      isAuthenticated,
      getAuthUser,
      logout() {
        logoutUser();
        this.$router.push(`/redirect/to/${encodeURIComponent("/")}`);
      },
    };
  },
  methods: {
    createAd() {
      this.$router.push("/products/create");
    },
  },
  created() {
    if (this.isAuthenticated) this.user = { ...this.getAuthUser() };
  },
});
</script>
