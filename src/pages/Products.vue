<template>
  <q-page class="row justify-center">
    <div
      class="col-lg-8 col-md-10 col-sm-11 col-xs-12 row q-col-gutter-lg q-pa-md"
    >
      <div class="col-12">
        Filtros
        <q-separator />
      </div>
      <div class="col-12 row q-col-gutter-x-md q-col-gutter-y-sm">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <q-select
            v-model="sexTypeFilter"
            :options="SEX_TYPES_OPTIONS"
            label="Filtrar por sexo"
            filled
            option-label="label"
            option-value="value"
            map-options
            emit-value
            @update:model-value="filter()"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <q-select
            v-model="proposeTypeFilter"
            :options="PROPOSE_TYPES_OPTIONS"
            label="Filtrar por proposta"
            filled
            option-label="label"
            option-value="value"
            map-options
            emit-value
            @update:model-value="filter()"
          />
        </div>
        <q-space />
        <div class="col-md-5 col-sm-6 col-xs-12">
          <q-input
            v-model="search"
            type="text"
            filled
            label="Buscar por:"
            :debounce="2000"
            @update:model-value="filter()"
          >
            <template v-slot:append>
              <q-btn round icon="search" unelevated @click="filter()" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="col-12">
        <q-separator />
      </div>

      <div class="col-12 row">
        <q-space />
        <span>{{ productsFiltered.length }} resultados</span>
      </div>

      <div class="col-12 q-col-gutter-md row" v-if="!!products.length">
        <div
          class="col-md-4 col-sm-6 col-xs-12 row"
          v-for="item in productsFiltered"
          :key="item.id"
        >
          <q-card class="my-card" flat bordered>
            <q-card-section class="q-pa-none">
              <q-carousel
                animated
                v-model="item.slide"
                :navigation="!!item.photos && item.photos.length > 1"
                :arrows="!!item.photos && item.photos.length > 1"
                infinite
                height="220px"
              >
                <q-carousel-slide
                  v-for="(photo, index) in item.photos"
                  :key="photo + index"
                  :name="index"
                  :img-src="photo"
                />
                <q-carousel-slide
                  v-if="!item.photos || item.photos.length == 0"
                  :name="0"
                  img-src="~assets/2932347_home_house_building_estate_icon.svg"
                />
              </q-carousel>
            </q-card-section>

            <q-separator />

            <!-- <q-card-section class="q-pa-xs">
            <q-btn
              fab
              color="accent"
              icon="add"
              class="absolute"
              style="
                top: 0;
                right: 12px;
                transform: translateY(-50%);
                z-index: 1;
              "
            >
              <q-tooltip> Ver Detalhes </q-tooltip>
            </q-btn>
          </q-card-section> -->

            <q-card-section class="q-py-none">
              <div class="text-overline text-positive">
                R${{ item.value }} por mês
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pt-md min-height-section-description">
              <div class="text-body1 text-bold">{{ item.description }}</div>
              <div class="text-body2 text-grey-6">
                <q-icon name="place" color="red" />
                {{ item.addressDistrict }}, {{ item.addressCity }} -
                {{ item.addressState }}
              </div>
              <div class="text-caption text-justify q-pt-sm">
                <q-item-label class="text-dark" caption lines="2"
                  >{{ item.brief }}
                  <q-tooltip v-if="!!item.brief && item.brief.length > 100">
                    {{ item.brief }}
                  </q-tooltip></q-item-label
                >
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-chip
                dense
                outline
                square
                :icon="getIconByRoommatesSex(item.sexType)"
                :label="getLabelByRoommatesSex(item.sexType)"
              >
                <q-tooltip>
                  {{ getTooltipByRoommatesSex(item.sexType) }}
                </q-tooltip>
              </q-chip>
              <q-space />

              <q-chip dense outline square icon="hotel" :label="item.bedrooms">
                <q-tooltip>
                  Quantidade de quartos ou locais para dormir
                </q-tooltip>
              </q-chip>
              <q-chip
                dense
                outline
                square
                icon="bathtub"
                :label="item.bathrooms"
              >
                <q-tooltip> Quantidade de Banheiros </q-tooltip>
              </q-chip>
              <!-- <q-chip outline square>
              <q-tooltip> Quantidade de Banheiros </q-tooltip>
              <q-icon name="bathtube" />
              <q-separator vertical />
              <span class="q-pl-sm">{{ item.bathrooms }}</span>
            </q-chip> -->
              <q-btn
                color="positive"
                unelevated
                class="q-mt-sm full-width"
                icon="add"
                label="Ver Detalhes"
                :to="`/products/${item.id}`"
                no-caps=""
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, computed } from "vue";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "app/firebaseConfig";

export default defineComponent({
  name: "ProductsPage",

  setup() {
    const $q = useQuasar();
    const ltSm = computed(() => {
      return $q.screen.lt.sm;
    });

    function getLabelByRoommatesSex(sexType = "") {
      if (sexType === "ONLY_MAN") return "Apenas para Homens";
      else if (sexType === "ONLY_WOMAN") return "Apenas para Mulheres";
      else if (sexType === "BOTH") return "Homens e Mulheres";
    }

    function getIconByRoommatesSex(sexType = "") {
      if (sexType === "ONLY_MAN") return "man";
      else if (sexType === "ONLY_WOMAN") return "woman";
      else if (sexType === "BOTH") return "wc";
      else return "";
    }

    function getTooltipByRoommatesSex(sexType = "") {
      if (sexType === "ONLY_MAN")
        return "Aceita dividir a casa com apenas com Homens";
      else if (sexType === "ONLY_WOMAN")
        return "Aceita dividir a casa com apenas com Mulheres";
      else if (sexType === "BOTH")
        return "Aceita dividir a casa com Homens e Mulheres";
    }

    function getRandomItem(list = []) {
      return list[getRandomIntInclusive(0, list.length - 1)];
    }

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    const SEX_TYPES = ["ONLY_MAN", "ONLY_WOMAN", "BOTH"];
    const PROPOSE_TYPES = ["SHARE_ROOM", "RENT_ONLY"];
    const STATUS_TYPES = ["OPEN", "CLOSED"];
    const SEX_TYPES_OPTIONS = [
      {
        label: "Todos",
        value: "ALL",
      },
      {
        label: "Apenas Homens",
        value: "ONLY_MAN",
      },
      {
        label: "Apenas Mulheres",
        value: "ONLY_WOMAN",
      },
      {
        label: "Homens e Mulheres",
        value: "BOTH",
      },
    ];
    const PROPOSE_TYPES_OPTIONS = [
      {
        label: "Todos",
        value: "ALL",
      },
      {
        label: "Apenas Compartilhar",
        value: "SHARE_ROOM",
      },
      {
        label: "Apenas Alugar",
        value: "RENT_ONLY",
      },
    ];
    // const STATUS_TYPES_OPTIONS = [{
    //   label: "Todos",
    //   value: "ALL"
    // },{
    //   label: "Aberto",
    //   value: "OPEN"
    // },{
    //   label: "Encerrado",
    //   value: "CLOSED"
    // }];

    return {
      search: ref(""),
      sexTypeFilter: ref("ALL"),
      proposeTypeFilter: ref("ALL"),
      ltSm,
      products: ref([]),
      productsFiltered: ref([]),
      getLabelByRoommatesSex,
      getIconByRoommatesSex,
      getTooltipByRoommatesSex,
      getRandomItem,
      getRandomIntInclusive,
      SEX_TYPES,
      PROPOSE_TYPES,
      STATUS_TYPES,
      SEX_TYPES_OPTIONS,
      PROPOSE_TYPES_OPTIONS,
    };
  },
  methods: {
    async populate() {
      const db = getFirestore(app);
      const adsCollection = collection(db, "adsV2");
      const data = [];
      const myQuery = query(adsCollection, where("status", "==", "OPEN"));

      const querySnapshot = await getDocs(myQuery);
      if (!querySnapshot.empty)
        querySnapshot.forEach((item) => {
          data.push({ ...item.data(), id: item.id });
        });
      this.products = data;

      this.products = this.products.map((v) => ({
        ...v,
        photos:
          !!v.photos && v.photos.length == 0 && !!v.cover
            ? [v.cover]
            : v.photos,
        slide: 0,
      }));
      this.productsFiltered = this.products;
      if (!!this.$route.query && !!this.$route.query.search) {
        this.search = this.$route.query.search;
        this.filter();
      }
    },
    filter() {
      this.productsFiltered = this.products.filter(
        (p) =>
          (this.sexTypeFilter !== "ALL"
            ? p.sexType === this.sexTypeFilter
            : true) &&
          (this.proposeTypeFilter !== "ALL"
            ? p.type === this.proposeTypeFilter
            : true) &&
          (!!this.search
            ? p.description.toLowerCase().includes(this.search.toLowerCase()) ||
              p.brief.toLowerCase().includes(this.search.toLowerCase()) ||
              p.addressDistrict
                .toLowerCase()
                .includes(this.search.toLowerCase())
            : true)
      );
    },
  },
  mounted() {
    this.populate();
  },
});
</script>

<style lang="scss">
.my-card {
  height: fit-content;
}
.min-height-section-description {
  min-height: 114px;
}
</style>
