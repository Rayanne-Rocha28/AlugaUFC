<template>
  <q-page class="row justify-center">
    <div class="col-md-10 col-sm-12 col-xs-12 q-pt-md">
      <q-table
        :grid="$q.screen.xs"
        flat
        bordered
        title="Meus anúncios"
        :dense="isDenseTable"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="search"
        :visible-columns="visibleColumns"
        :pagination="initialPagination"
        :loading="loading"
      >
        <template v-slot:top="props">
          <div class="q-ml-sm q-table__title">Meus anúncios</div>
          <q-space />
          <q-input
            v-model="search"
            filled
            dense
            type="text"
            label="Buscar por:"
          />
          <q-select
            class="q-ml-md"
            v-model="visibleColumns"
            multiple
            filled
            dense
            options-dense
            display-value="Colunas"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            style="min-width: 150px"
          />
          <!-- <q-toggle class="q-ml-md" v-model="isDenseTable" label="Compacto" /> -->
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          >
            <q-tooltip>
              {{
                (props.inFullscreen ? "Sair do " : "Entrar no") +
                "modo tela cheia"
              }}
            </q-tooltip></q-btn
          >
        </template>

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template v-slot:body-cell-photos="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon="visibility"
              round
              size="sm"
              outline
              @click="
                dialog = true;
                carouselRowItem = props.row;
              "
              ><q-tooltip> Ver fotos </q-tooltip></q-btn
            >
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-toggle
              v-model="props.row.status"
              checked-icon="check"
              unchecked-icon="clear"
              :color="props.row.status == 'OPEN' ? 'green' : 'red'"
              true-value="OPEN"
              false-value="CLOSED"
              keep-color
              @update:model-value="updateRow(props.row)"
            >
              <q-tooltip>
                {{
                  props.row.status == "OPEN"
                    ? "Anúncio ativo"
                    : "Anúncio removido"
                }}
              </q-tooltip>
            </q-toggle>
          </q-td>
        </template>
      </q-table>

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
              v-model="carouselRowItem.slide"
              :arrows="
                !!carouselRowItem.photos && carouselRowItem.photos.length > 1
              "
              infinite
              :thumbnails="
                !!carouselRowItem.photos && carouselRowItem.photos.length > 1
              "
              :fullscreen="fullscreenCarousel"
            >
              <q-carousel-slide
                v-for="(photo, index) in carouselRowItem.photos"
                :key="photo + index"
                :name="index"
                :img-src="photo"
              />
              <q-carousel-slide
                v-if="
                  !carouselRowItem.photos || carouselRowItem.photos.length == 0
                "
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
import { defineComponent, ref } from "vue";
import { app, db } from "app/firebaseConfig";
import {
  doc,
  updateDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { isAuthenticated, getAuthUser } from "../utils/authentication";

const columns = [
  {
    name: "title",
    required: true,
    label: "Título",
    align: "left",
    field: (row) => row.description,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "photos",
    required: false,
    label: "Fotos",
    align: "left",
    field: (row) => row.photos,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "mail",
    required: false,
    label: "Email",
    align: "right",
    field: (row) => row.mail,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "phone",
    required: false,
    label: "Telefone",
    align: "right",
    field: (row) => row.phone,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "bedrooms",
    required: false,
    label: "Qtde. Quartos",
    align: "right",
    field: (row) => row.bedrooms,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "bathrooms",
    required: false,
    label: "Qtde. Banheiros",
    align: "right",
    field: (row) => row.bathrooms,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "addressStreet",
    required: false,
    label: "Rua",
    align: "left",
    field: (row) => row.addressStreet,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "addressNumber",
    required: false,
    label: "Número",
    align: "left",
    field: (row) => row.addressNumber,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "addressDistrict",
    required: false,
    label: "Bairro",
    align: "left",
    field: (row) => row.addressDistrict,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "sexType",
    required: false,
    label: "Público alvo",
    align: "left",
    field: (row) => row.sexType,
    format: (val) =>
      `${
        val == "ONLY_MAN"
          ? "Homens"
          : val == "ONLY_WOMAN"
          ? "Mulheres"
          : "Homens e Mulheres"
      }`,
    sortable: true,
  },
  {
    name: "type",
    required: false,
    label: "Tipo do anúncio",
    align: "left",
    field: (row) => row.type,
    format: (val) => `${val == "SHARE_ROOM" ? "Dividir AP" : "Alugar"}`,
    sortable: true,
  },
  {
    name: "brief",
    required: false,
    label: "Descrição",
    align: "left",
    field: (row) => row.brief,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "value",
    required: true,
    align: "right",
    label: "Valor",
    field: (row) => row.value,
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "Status",
    align: "right",
    field: (row) => row.status,
    format: (val) => `${val}`,
    sortable: true,
  },
];

export default defineComponent({
  name: "MyProductsPage",

  setup() {
    return {
      visibleColumns: ref([
        "photos",
        "title",
        "bathrooms",
        "bedrooms",
        "status",
        "value",
      ]),
      columns,
      rows: ref([]),
      search: ref(""),
      isDenseTable: ref(false),
      initialPagination: {
        sortBy: "status",
        descending: true,
        page: 1,
        rowsPerPage: 20,
      },
      user: ref({}),
      isAuthenticated,
      getAuthUser,
      loading: ref(false),
      dialog: ref(false),
      carouselRowItem: ref({}),
      maximizedToggle: ref(true),
      fullscreenCarousel: ref(false),
    };
  },
  mounted() {
    if (this.isAuthenticated()) {
      this.user = this.getAuthUser();
      this.populate();
    } else this.$router.push("/login");
  },
  methods: {
    async populate() {
      this.loading = true;
      const db = getFirestore(app);
      const adsCollection = collection(db, "adsV2");
      const data = [];
      const myQuery = query(adsCollection, where("userId", "==", this.user.id));

      const querySnapshot = await getDocs(myQuery);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((item) => {
          data.push({ ...item.data(), id: item.id, slide: 0 });
        });
        this.rows = data;
      }
      this.loading = false;
    },

    async updateRow(row) {
      this.loading = true;
      const notif = this.$q.notify({
        type: "ongoing",
        message: "Atualizando anúncio, aguarde...",
      });
      try {
        const docRef = await updateDoc(doc(db, "adsV2", row.id), row);
        this.loading = false;
        notif({
          type: "positive",
          message: "Anúncio atualizado com sucesso!",
          timeout: 1000,
        });
      } catch (error) {
        notif({
          type: "negative",
          message: "Ocorreu um erro durante o salvamento!",
          timeout: 1000,
        });
        console.error("Erro ao atualizar anúncio:", error.message);
        this.loading = false;
      }
    },
  },
});
</script>
