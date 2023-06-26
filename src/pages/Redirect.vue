<template>
  <q-page class="flex flex-center"> </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RedirectPage",

  setup() {
    return {
      redirect() {
        if (!!this.$route.params.nextRedirect)
          this.$router.push(`/${this.$route.params.nextRedirect}`);
        else this.$router.back();
      },
    };
  },
  created() {
    this.redirect();
  },
});
</script>
