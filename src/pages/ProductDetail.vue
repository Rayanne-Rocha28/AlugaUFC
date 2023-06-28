<template>
  <q-page class="flex flex-center bg-secondary">
    <div
      :class="[
        'container column bg-white shadow-3',
        ltSm ? 'q-px-sm q-py-md' : 'container-padding',
      ]"
    >
      <div class="row items-center">
        <span class="text-h6">Detalhes do anúncio</span>
        <q-space /><q-btn
          color="primary"
          push
          icon="arrow_back_ios"
          label="Voltar"
          @click="$router.back()"
          no-caps
        />
      </div>

      <q-form
        @submit="() => {}"
        @reset="() => {}"
        class="row justify-center q-my-md q-col-gutter-sm"
      >
        <q-input
          readonly
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adTitle"
          filled
          v-model="adV2.description"
          label="Titulo do anúncio"
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
          readonly
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adMail"
          filled
          v-model="adV2.mail"
          label="Email de contato"
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
          readonly
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adPhone"
          filled
          v-model="adV2.phone"
          label="Telefone de contato"
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

        <q-input
          readonly
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adValue"
          filled
          v-model="adV2.value"
          label="Valor"
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
          readonly
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="adAddressStreet"
          filled
          v-model="adV2.addressStreet"
          label="Rua"
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
          readonly
          dense
          class="col-md-4 col-sm-4 col-xs-12"
          name="adAddressNumber"
          filled
          v-model="adV2.addressNumber"
          label="Número"
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
          readonly
          dense
          class="col-md-8 col-sm-8 col-xs-12"
          name="adAddressDistrict"
          filled
          v-model="adV2.addressDistrict"
          label="Bairro"
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
          readonly
          dense
          class="col-6"
          name="adBedrooms"
          filled
          type="number"
          v-model="adV2.bedrooms"
          label="Quartos"
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
          readonly
          dense
          class="col-6"
          name="adBathroom"
          filled
          type="number"
          v-model="adV2.bathrooms"
          label="Banheiros"
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
            readonly
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
            readonly
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

        <div class="col-md-12 col-sm-12 col-xs-12 q-pb-sm">
          <q-btn
            class="full-width"
            color="primary"
            icon="visibility"
            label="Ver Fotos"
            @click="dialog = true"
            no-caps
          />
        </div>

        <q-input
          readonly
          dense
          class="col-md-12 col-sm-12 col-xs-12"
          name="aluDescription"
          filled
          v-model="adV2.brief"
          label="Descrição"
          lazy-rules
          type="textarea"
          :rules="[(val) => (val) => true]"
        >
          <template v-slot:prepend>
            <q-icon name="description" />
          </template>
        </q-input>
      </q-form>

      <q-dialog
        v-model="dialog"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card style="min-height: 260px; min-width: 360px; width: 90%">
          <q-card-section class="q-pa-none">
            <div class="row">
              <q-space />
              <q-btn
                color="dark"
                round
                flat
                icon="close"
                @click="dialog = false"
              />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-carousel
              animated
              v-model="adV2.slide"
              :arrows="!!adV2.photos && adV2.photos.length > 1"
              infinite
              :thumbnails="!!adV2.photos && adV2.photos.length > 1"
              :fullscreen="fullscreenCarousel"
            >
              <q-carousel-slide
                v-for="(photo, index) in adV2.photos"
                :key="photo + index"
                :name="index"
                :img-src="photo"
              />
              <q-carousel-slide
                v-if="!adV2.photos || adV2.photos.length == 0"
                :name="0"
                img-src="~assets/2932347_home_house_building_estate_icon.svg"
              />
              <template v-slot:control>
                <q-carousel-control position="top-right" :offset="[18, 18]">
                  <q-btn
                    round
                    dense
                    color="white"
                    text-color="primary"
                    :icon="
                      fullscreenCarousel ? 'fullscreen_exit' : 'fullscreen'
                    "
                    @click="fullscreenCarousel = !fullscreenCarousel"
                  />
                </q-carousel-control>
              </template>
            </q-carousel>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "app/firebaseConfig";
import { getAuthUser, isAuthenticated } from "../utils/authentication";
export default {
  name: "ProductDetailPage",
  setup() {
    const $q = useQuasar();
    const ltSm = computed(() => {
      return $q.screen.lt.sm;
    });

    const adV2 = ref({});

    return {
      adV2,
      getAuthUser,
      isAuthenticated,
      ltSm,
      dialog: ref(false),
      maximizedToggle: ref(true),
      fullscreenCarousel: ref(false),
    };
  },
  methods: {
    async getProduct(id) {
      const db = getFirestore(app);
      const adsCollection = collection(db, "adsV2");
      const data = [];
      const myQuery = query(adsCollection, where("id", "==", id));

      const querySnapshot = await getDocs(myQuery);
      if (!querySnapshot.empty)
        querySnapshot.forEach((item) => {
          this.adV2 = { ...item.data(), id: item.id, slide: 0 };
        });
    },
  },
  mounted() {
    if (!!this.$route.params.id) {
      this.getProduct(this.$route.params.id);
    } else this.$router.push("/not-found");
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
