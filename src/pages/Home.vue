<template>
  <q-page class="row items-center justify-center">
    <div id="custom-background-color" class="col-12"></div>
    <div
      class="col-lg-6 col-md-8 col-sm-11 col-xs-12 row justify-center zindex1 q-px-sm"
    >
      <div class="col-12 text-center">
        <img
          v-if="ltSm"
          alt="Lovo Vertical"
          src="~assets/icon-logo-100.svg"
          style="width: 130px; height: 130px"
        />
        <img
          v-else
          alt="Logo Horizontal"
          src="~assets/logo-horizontal2.svg"
          style="width: 350px; height: 133px"
        />
      </div>
      <div class="col-12 text-center">
        <h4 class="q-my-xs">Encontre quartos e apartamentos para alugar</h4>
        <span class="text-body2"
          >Navegue por anúncios de outros estudantes e encontre a melhor opção
          para você</span
        >
      </div>
      <div class="col-12 q-pt-md">
        <q-input
          v-model="search"
          filled
          type="text"
          label="O que está buscando?"
          clearable
          @keyup.enter="submit"
        >
          <template v-slot:append>
            <q-btn round icon="search" unelevated to="/products" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "HomePage",

  setup() {
    const $q = useQuasar();
    const ltSm = computed(() => {
      return $q.screen.lt.sm;
    });

    return {
      search: ref(""),
      ltSm,
    };
  },

  methods: {
    submit() {
      if (!!this.search)
        this.$router.push({
          path: "/products",
          query: { search: this.search },
        });
    },
  },
});
</script>

<style lang="scss">
#custom-background-color {
  z-index: 0;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 45%;
  background-color: $primary;
  z-index: 1;
}

.zindex1 {
  z-index: 1;
}
</style>
