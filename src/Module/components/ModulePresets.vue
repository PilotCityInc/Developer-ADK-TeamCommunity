<template>
  <v-container class="module-outcomes">
    <div class="module-outcomes__container">
      <!-- <v-divider class="presets__divider"></v-divider> -->

      <!-- <div class="presets__section-title">General</div> -->
      <!-- <div class="presets__nopresets">No tweaking necessary</div> -->
      <!-- <div class="presets__section-title">Maximum Team Members</div> -->
      <v-select
        v-model="adkData.maxTeamMembers"
        :items="maxTeamMemberItems"
        outlined
        rounded
        label="Maximum Team Members"
      ></v-select>
      <div class="text-center">
        <v-btn class="mt-8" x-large rounded outlined depressed :loading="loading" @click="process()">Save</v-btn>
      </div>
      <v-alert v-if="success || error" :type="success ? 'success' : 'error'" class="mt-2">{{
        message
      }}</v-alert>
      <!-- <v-divider class="presets__divider"></v-divider>
      <div class="presets__section-title">Instructions</div>
      <Instruct v-model="setupInstructions" /> -->
      <!-- <v-divider class="presets__divider"></v-divider>
      <div class="presets__section-title">Defaults</div>

      <v-select
        disabled
        :items="group"
        label="What activity group does this belong to?"
        outlined
      ></v-select>
      <v-select
        disabled
        :items="required"
        label="Is this activity required for participants to complete?"
        outlined
      ></v-select> -->

      <!-- <v-select
        :items="lockOrder"
        label="Lock activity group and placement order?"
        outlined
      ></v-select> -->
      <!-- <v-select disabled :items="deliverable" label="Is this a deliverable?" outlined></v-select> -->
      <!-- <v-select
        :items="accessibility"
        label="Make this activity accessible to participants anytime?"
        outlined
      ></v-select> -->
      <!-- <v-select
        disabled
        :items="endEarly"
        label="Allow participants to end program early after completion of this activity?"
        outlined
      ></v-select> -->
      <!-- POST-ACTIVITY REFLECTION -->
      <!-- <div class="presets__reflection">
        <v-btn class="presets__reflection-buttons" small depressed outlined>Save</v-btn>
        <v-btn class="presets__reflection-buttons" small depressed outlined>Preview</v-btn>
      </div> -->
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <!-- If activity is required, show button below, make tooltip show up while disabled, right now tooltip doesn't show up -->
      <!-- <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" disabled v-bind="attrs" v-on="on">Delete Activity</v-btn>
          </template>
          <span>Required activities cannot be deleted</span>
        </v-tooltip>
      </div> -->
      <!-- Delete break when the two delete buttons above and below have been integrated as one solution -->
      <!-- <br /> -->
      <!-- If activity is optional, show button below -->
      <!-- <div><v-btn color="red" disabled depressed>Delete Activity</v-btn></div> -->
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { loading, getModAdk, getModMongoDoc } from 'pcv4lib/src';
// import { Db } from 'mongodb';
// import Instruct from './ModuleInstruct.vue';
import { MongoDoc } from '../types';

export default defineComponent({
  name: 'ModulePresets',
  components: {
    // Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    teamDoc: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    db: {
      required: true,
      type: Object as PropType<any>
    }
  },
  setup(props, ctx) {
    const maxTeamMemberItems = [...Array(7).keys()].map(i => i + 1);

    const { adkData } = getModAdk(props, ctx.emit, 'team');
    const programDoc = getModMongoDoc(props, ctx.emit);
    // const presets = reactive({
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
    // endEarly: [
    //   'Creator has not allowed participants to end early after this activity',
    //   'Creator has allow end early option only at preset order placement',
    //   'Yes',
    //   'No'
    //   ]
    // });
    //   const setupInstructions = ref({
    //     description: '',
    //     instructions: ['', '', '']
    //   });
    return {
      adkData,
      maxTeamMemberItems,
      ...loading(programDoc.value.update, 'Saved Successfully', 'Could not save at this time')
    };
  }
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
    // margin-left: auto;
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
