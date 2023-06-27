<template>
  <q-page class="flex flex-center bg-secondary">
    <div
      :class="[
        'container column bg-white shadow-3',
        ltSm ? 'q-px-sm q-py-md' : 'container-padding',
      ]"
    >
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
          class="col-md-12 col-sm-12 col-xs-12"
          name="adTitle"
          filled
          v-model="adV2.description"
          label="Titulo do anúncio *"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 3) || 'Por favor insira o título do anúncio',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="badge" />
          </template>
        </q-input>

        <q-input
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adAddressStreet"
          filled
          v-model="adV2.addressStreet"
          label="Rua *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 3) || 'Por favor insira a rua',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>

        <q-input
          dense
          class="col-md-4 col-sm-4 col-xs-12"
          name="adAddressNumber"
          filled
          v-model="adV2.addressNumber"
          label="Número *"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por favor insira o número da casa',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="numbers" />
          </template>
        </q-input>

        <q-input
          dense
          class="col-md-8 col-sm-8 col-xs-12"
          name="adAddressDistrict"
          filled
          v-model="adV2.addressDistrict"
          label="Bairro *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 3) || 'Por favor insira o bairro',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>

        <q-input
          dense
          class="col-md-6 col-sm-12 col-xs-12"
          name="adBedrooms"
          filled
          type="number"
          v-model="adV2.bedrooms"
          label="Quartos *"
          lazy-rules
          mask="##"
          :rules="[
            (val) =>
              (val && val > 0) || 'Por favor insira a quantidade de quartos',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="hotel" />
          </template>
        </q-input>

        <q-input
          dense
          class="col-md-6 col-sm-12 col-xs-12"
          name="adBathroom"
          filled
          type="number"
          v-model="adV2.bathrooms"
          label="Banheiros *"
          mask="##"
          lazy-rules
          :rules="[
            (val) =>
              (val && val > 0) || 'Por favor insira a quantidade de banheiros',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="bathtub" />
          </template>
        </q-input>

        <div class="col-md-12 col-sm-12 col-xs-12 q-pb-sm column q-gutter-sm">
          <div class="text-caption">Para quem este anúncio é direcionado?</div>
          <q-btn-toggle
            class="my-custom-toggle"
            v-model="adV2.sexType"
            spread
            no-caps
            unelevated
            :dense="ltSm"
            toggle-color="primary"
            text-color="primary"
            :options="[
              {
                value: 'ONLY_MAN',
                slot: 'one',
              },
              {
                value: 'ONLY_WOMAN',
                slot: 'two',
              },
              {
                value: 'BOTH',
                slot: 'three',
              },
            ]"
          >
            <template v-slot:one>
              <div class="row items-center no-wrap">
                <div class="text-center">Apenas<br />Homens</div>
                <q-icon right name="man" />
              </div>
            </template>

            <template v-slot:two>
              <div class="row items-center no-wrap">
                <div class="text-center">Apenas<br />Mulheres</div>
                <q-icon right name="woman" />
              </div>
            </template>

            <template v-slot:three>
              <div class="row items-center no-wrap">
                <div class="text-center">Homens<br />e Mulheres</div>
                <q-icon right name="wc" />
              </div>
            </template>
          </q-btn-toggle>
        </div>

        <div class="col-md-12 col-sm-12 col-xs-12 q-pb-sm column q-gutter-sm">
          <div class="text-caption">
            Qual o tipo do anúncio?
            <q-icon name="help">
              <q-tooltip>
                O objetivo do anúncio é encontrar pessoas para alugar ou dividir
                o imóvel?
              </q-tooltip>
            </q-icon>
          </div>
          <q-btn-toggle
            class="my-custom-toggle"
            v-model="adV2.type"
            spread
            no-caps
            unelevated
            :dense="ltSm"
            toggle-color="primary"
            text-color="primary"
            :options="[
              {
                label: 'Apenas Compartilhar',
                value: 'SHARE_ROOM',
              },
              {
                label: 'Apenas Alugar',
                value: 'RENT_ONLY',
              },
            ]"
          />
        </div>

        <q-input
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adValue"
          filled
          v-model="adV2.value"
          label="Valor *"
          prefix="R$"
          lazy-rules
          mask="#.##"
          reverse-fill-mask
          :rules="[(val) => (val && val > 0) || 'Por favor insira o valor']"
        >
          <template v-slot:prepend>
            <q-icon name="money" />
          </template>
        </q-input>

        <q-input
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adMail"
          filled
          v-model="adV2.mail"
          label="Email de contato *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 3) || 'Por favor insira o email',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adPhone"
          filled
          v-model="adV2.phone"
          label="Telefone de contato *"
          mask="(##) #####-####"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 13) || 'Por favor insira o telefone',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="phone_iphone" />
          </template>
        </q-input>

        <q-file
          multiple
          dense
          filled
          class="col-md-12 col-sm-12 col-xs-12"
          use-chips
          v-model="adV2.cover"
          accept=".jpg, .jpeg, .png"
          @rejected="onRejected"
          :rules="[(val) => true]"
          label="Fotos"
        >
          <template v-slot:prepend>
            <q-icon name="image" />
          </template>
        </q-file>
        <q-input
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="aluDescription"
          filled
          v-model="adV2.brief"
          label="Descrição *"
          lazy-rules
          type="textarea"
          :rules="[(val) => (val) => true]"
        >
          <template v-slot:prepend>
            <q-icon name="description" />
          </template>
        </q-input>

        <div class="col-12 text-center q-gutter-y-sm">
          <q-btn
            class="full-width"
            type="submit"
            color="primary"
            label="Cadastrar anúncio"
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
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, getDoc, collection, doc } from "firebase/firestore";
import { app, db } from "app/firebaseConfig";
import { getAuthUser, isAuthenticated } from "../utils/authentication";
export default {
  name: "ProductFormPage",
  setup() {
    const $q = useQuasar();
    const ltSm = computed(() => {
      return $q.screen.lt.sm;
    });

    const storage = getStorage(app);

    const adV2 = ref({
      description: "",
      addressStreet: "",
      addressNumber: "",
      addressDistrict: "",
      addressCity: "Russas",
      addressState: "CE",
      googleMapsURL: "",
      brief: "",
      bedrooms: 1,
      bathrooms: 1,
      sexType: "BOTH",
      type: "SHARE_ROOM",
      phone: "",
      mail: "",
      value: "",
      status: "OPEN",
      photos: [],
      cover: "",
      googleMapsURL: "",
      userId: "",
      clicksCount: 0,
    });

    return { adV2, storage, getAuthUser, isAuthenticated, ltSm };
  },
  methods: {
    onSubmit() {
      const notif = this.$q.notify({
        type: "ongoing",
        message: "Registrando anúncio, aguarde...",
        timeout: 3000,
      });
      try {
        this.uploadImage(this.adV2.cover).then(async (img) => {
          const docRef = await addDoc(collection(db, "adsV2"), {
            ...this.adV2,
            photos: img,
            cover: img[0] || "",
            userId: getAuthUser().id,
          });
          notif({
            type: "positive",
            message: "Anúncio registrado com sucesso!",
            timeout: 1000,
          });
          this.$router.push("/products");
        });
      } catch (error) {
        notif({
          type: "negative",
          message: "Ocorreu um erro durante o cadastro do anuncio!",
          timeout: 1000,
        });
      }
    },
    async uploadImage(event) {
      const images = [];
      if (!!event && event.length > 0)
        for (let img of event) {
          try {
            const file = img;
            const ref = storageRef(this.storage, `images/${file.name}`);
            const snapshot = await uploadBytes(ref, file);
            const uri = await getDownloadURL(snapshot.ref);
            images.push(uri);
          } catch (error) {
            console.error("Erro ao enviar imagem:", error);
          }
        }
      return images;
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
}
.container-padding {
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
