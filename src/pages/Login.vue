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

      <q-form @submit="auth()" @reset="() => {}" class="form q-gutter-y-sm">
        <q-input
          name="ufcUsername"
          filled
          v-model="email"
          label="Usuário"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 3) || 'Por favor informe o seu usuário',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input
          name="ufcPassword"
          filled
          :type="isPwd ? 'password' : 'text'"
          v-model="password"
          label="Senha"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '' && val.length > 3) ||
              'Por favor digite sua senha',
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

        <q-btn
          class="full-width"
          type="submit"
          color="primary"
          label="Entrar"
          size="md"
          :loading="loading"
          no-caps
        />

        <div class="row justify-center">
          <a
            @click="$router.push('/signup')"
            class="link text-grey-8 text-center"
            >Ainda não tem conta?
            <span class="text-primary">Cadastre-se</span></a
          >
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { app } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      email: ref(""),
      password: ref(""),
      isPwd: ref(true),
      loading: ref(false),
    };
  },
  methods: {
    auth() {
      const auth = getAuth(app);
      const db = getFirestore(app);
      const usersCollection = collection(db, "users");
      this.loading = true;
      const notif = this.$q.notify({
        type: "ongoing",
        message: "Entrando, aguarde...",
      });

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userQuery = query(
            usersCollection,
            where("uid", "==", user.uid)
          );

          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const user = { ...doc.data(), id: doc.id };

              localStorage.setItem("user_payload", JSON.stringify(user));
            });
          } else {
            notif({
              type: "negative",
              message: "Ocorreu um erro durante a autenticação!",
              timeout: 1000,
            });
            this.loading = false;
            console.log("Usuário não encontrado");
          }

          user.getIdToken().then((res) => {
            localStorage.setItem("access_token", res);
          });
          notif({
            type: "positive",
            message: "Usuário autenticado com sucesso!",
            timeout: 1000,
          });
          this.$router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          notif({
            type: "negative",
            message: "Ocorreu um erro durante a autenticação!",
            timeout: 1000,
          });
          this.loading = false;
          console.error("Erro ao autenticar usuário:", errorCode, errorMessage);
        });
    },
  },
});
</script>

<style>
.container {
  width: 386px;
  border-radius: 5px;
  padding: 30px 50px;
}

.form {
  margin-top: 10px;
}

.link {
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  font-size: 12px;
}

.description {
  text-decoration: none;
  font-weight: 500;
  font-size: 12px;
}
</style>
