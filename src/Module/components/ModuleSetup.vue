<template>
  <v-container class="module-edit">
    <div class="module-edit__container">
      <!-- NO SETUP NECESSARY / COMMENT OUT IF SETUP IS NECESSARY -->
      <div class="module-setup__none">No setup necessary</div>
      <!-- ENTER CONTENT HERE -->
    </div>
  </v-container>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';

export default {
  name: 'ModuleSetup',
  setup() {
    const setupInstructions = ref(['']);
    // const setup = reactive({});
    return {
      setupInstructions
    };
  }
};
</script>

<style lang="scss">
.module-setup {
  &__none {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }
}
</style>
