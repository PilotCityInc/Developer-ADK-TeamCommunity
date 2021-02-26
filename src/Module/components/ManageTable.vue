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
        <v-btn x-small outlined depressed :ripple="false"
          ><v-icon x-small left> mdi-close-circle </v-icon>Remove</v-btn
        >
      </template>
      <template v-slot:item.accessChoice>
        <v-text-field outlined></v-text-field>
      </template>

      <template v-slot:item.avatar>
        <v-avatar size="32"
          ><img
            src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
        /></v-avatar>
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
