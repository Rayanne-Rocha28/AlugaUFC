<template>
  <q-page class="flex flex-center bg-secondary">
    <div class="container column bg-white shadow-3">
      <router-link to="/" class="text-center">
        <q-img
          class="self-center"
          src="~assets/logo-horizontal.svg"
          width="250px"
          height="100px"
        />
      </router-link>

      <q-form
        @submit="onSubmit"
        @reset="() => {}"
        class="row justify-center q-my-md q-col-gutter-sm"
      >
        <q-input
          dense
          class="col-md-8 col-sm-12 col-xs-12"
          name="txrFullname"
          filled
          v-model="user.fullName"
          label="Nome e Sobrenome"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 3) ||
              'Por favor informe o seu Nome e Sobrenome',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="badge" />
          </template>
        </q-input>
        <div class="col-md-4 col-sm-12 col-xs-12 q-pb-sm">
          <!-- <div class="text-center">Categoria</div> -->
          <q-btn-toggle
            class="my-custom-toggle"
            v-model="user.gender"
            spread
            no-caps
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: 'Homem', value: 'M' },
              { label: 'Mulher', value: 'F' },
            ]"
          />
        </div>

        <q-input
          dense
          class="col-12"
          name="txrEmail"
          filled
          v-model="user.email"
          type="email"
          label="Email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 5) || 'Por favor informe o seu email',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <div class="col-md-12 col-sm-12 col-xs-12 q-pb-sm">
          <!-- <div class="text-center">Categoria</div> -->
          <q-btn-toggle
            class="my-custom-toggle"
            v-model="user.type"
            spread
            no-caps
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: 'Estudante', value: 'student' },
              { label: 'Proprietário', value: 'owner' },
            ]"
          />
        </div>
        <!-- <q-input
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="txrPassword"
          filled
          :type="isPwd ? 'password' : 'text'"
          v-model="user.password"
          label="Senha"
          lazy-rules
          :rules="[
            (val) => !!val || 'Por favor digite sua senha',
            (val) =>
              (!!val && val !== '' && val.length >= 4) ||
              'Sua senha deve ter pelo menos 4 caracteres',
            (val) => (!!val && val === user.password) || 'Senhas não coincidem',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="txrConfirmPassword"
          filled
          :type="isPwd ? 'password' : 'text'"
          v-model="user.confirmPassword"
          label="Confirme sua senha"
          lazy-rules
          :rules="[
            (val) => !!val || 'Por favor digite sua senha',
            (val) =>
              (!!val && val !== '' && val.length >= 4) ||
              'Sua senha deve ter pelo menos 4 caracteres',
            (val) => (!!val && val === user.password) || 'Senhas não coincidem',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input> -->

        <div class="col-12 text-center q-gutter-y-sm">
          <q-btn
            class="full-width"
            type="submit"
            color="primary"
            label="Confirmar Edição"
            size="md"
            :loading="loading"
            no-caps
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import { app, db } from "app/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { isAuthenticated, getAuthUser } from "../utils/authentication";

export default {
  name: "UserFormPage",
  setup() {
    const auth = getAuth(app);
    const user = ref({
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
      gender: "",
      fullName: "",
    });

    const isPwd = ref(true);
    const loading = ref(false);

    return {
      auth,
      user,
      isPwd,
      loading,
      isAuthenticated,
      getAuthUser,
    };
  },
  computed: {
    darkIsActive: function () {
      return this.$q.dark.isActive;
    },
  },
  methods: {
    async onSubmit() {
      this.loading = true;
      const notif = this.$q.notify({
        type: "ongoing",
        message: "Atualizando usuário, aguarde...",
      });
      try {
        const docRef = await updateDoc(
          doc(db, "users", this.user.id),
          this.user
        );

        notif({
          type: "positive",
          message: "Usuário atualizado com sucesso!",
          timeout: 1000,
        });

        localStorage.setItem("user_payload", JSON.stringify(this.user));
        this.$router.push("/redirect");
      } catch (error) {
        notif({
          type: "negative",
          message: "Ocorreu um erro durante o salvamento!",
          timeout: 1000,
        });
        console.error("Erro ao atualizar usuário:", error.message);
        this.loading = false;
      }
    },
  },
  mounted() {
    if (this.isAuthenticated()) this.user = this.getAuthUser();
    else this.$router.push("/login");
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 500px;
  border-radius: 20px;
  padding: 15px 40px;
}
.link {
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  font-size: 12px;
}
.my-custom-toggle {
  border: 1px solid $primary;
}
</style>
