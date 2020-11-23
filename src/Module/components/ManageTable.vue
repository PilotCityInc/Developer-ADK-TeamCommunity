<template>
  <div>
    <v-data-table
      :headers="header"
      :items="manageitems"
      sort-by="resource"
      items-per-page="100"
      hide-default-footer="true"
    >
      <template v-slot:item.delete>
        <v-btn depressed color="#FFFFFF" :ripple="false"
          ><v-icon color="#FF0000"> mdi-delete </v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import { MANAGEHEADER, manageitems } from './const';

export default {
  name: 'ManageTable',
  setup() {
    return { header: ref(MANAGEHEADER), manageitems };
  }
};
</script>
