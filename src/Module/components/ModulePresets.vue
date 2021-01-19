<template>
  <v-container class="module-outcomes">
    <div class="module-outcomes__container">
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <div class="presets__section-title">Maximum Team Members</div>
      <v-select :items="items" filled dense outlined label="Maximum Team Members"></v-select>
      <!-- POST-ACTIVITY REFLECTION -->
      <div class="presets__reflection">
        <v-btn class="presets__reflection-buttons" small depressed outlined>Save</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Instruct from './ModuleInstruct.vue';
import { items } from './const';
// import gql from 'graphql-tag';

export default defineComponent({
  name: 'ModulePresets',
  data() {
    return {
      items
    };
  }

  // setup() {
  //   const presets = reactive({
  //     group: ['Setup', 'Project', 'Screening', 'Internship'],
  //     required: ['Creator requires this activity', 'Yes', 'No'],
  //     lockOrder: ['Creator locked activity group and placement order', 'Yes', 'No'],
  //     deliverable: ['Yes', 'No'],
  //     notifications: ['Creator turned on by default', 'Turn on', 'Turn off'],
  //     accessibility: [
  //       'Creator has turned off accessibility anytime',
  //       'Creator has turned on accessibility anytime',
  //       'Yes',
  //       'No'
  //     ],
  //     items: ['1', '2', '3', '4', '5', '6', '7'],
  //     endEarly: [
  //       'Creator has not allowed participants to end early after this activity',
  //       'Creator has allow end early option only at preset order placement',
  //       'Yes',
  //       'No'
  //     ]
  //   });
  //   const setupInstructions = ref({
  //     description: '',
  //     instructions: ['', '', '']
  //   });
  //   return {
  //     ...toRefs(presets),
  //     setupInstructions
  //   };
  // }
});
</script>

<style lang="scss">
.presets {
  &__reflection-buttons {
    margin-right: 10px;
    margin-top: 10px;
    align-content: center;
  }

  &__reflection {
    margin-left: auto;
    align-content: center;
  }

  &__divider {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  &__section-title {
    color: #000000;
    font-size: 25px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 35px;
  }

  &__nopresets {
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
