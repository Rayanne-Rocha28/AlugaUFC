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
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { app, db } from "app/firebaseConfig";
import {
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
    name: "status",
    required: true,
    label: "Status",
    align: "left",
    field: (row) => row.status,
    format: (val) => `${val}`,
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
];

// { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
// { name: "carbs", label: "Carbs (g)", field: "carbs" },
// { name: "protein", label: "Protein (g)", field: "protein" },
// { name: "sodium", label: "Sodium (mg)", field: "sodium" },
// {
//   name: "calcium",
//   label: "Calcium (%)",
//   field: "calcium",
//   sortable: true,
//   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
// },
// {
//   name: "iron",
//   label: "Iron (%)",
//   field: "iron",
//   sortable: true,
//   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
// },

export default defineComponent({
  name: "MyProductsPage",

  setup() {
    return {
      visibleColumns: ref([
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
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: -1,
      },
      user: ref({}),
      isAuthenticated,
      getAuthUser,
    };
  },
  mounted() {
    this.user = this.getAuthUser();
    this.populate();
  },
  methods: {
    async populate() {
      console.log("");
      const db = getFirestore(app);
      const adsCollection = collection(db, "adsV2");
      const data = [];
      const myQuery = query(adsCollection, where("userId", "==", this.user.id));

      const querySnapshot = await getDocs(myQuery);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((item) => {
          data.push({ ...item.data() });
        });
        this.rows = data;
      }
    },
  },
});
</script>
