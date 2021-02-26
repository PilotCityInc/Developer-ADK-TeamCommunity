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
        <v-dialog v-model="removeMemberDialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" x-small outlined depressed :ripple="false" v-on="on"
              ><v-icon x-small left> mdi-close-circle </v-icon>Remove</v-btn
            >
          </template>

          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">
                Are you sure you want to remove team member?
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex flex-column justify-center">
              <div class="d-flex flex-row justify-center mt-4 mb-6">
                <v-btn
                  class="ma-2"
                  outlined
                  x-large
                  rounded
                  depressed
                  @click="removeMemberDialog = false"
                  >Cancel</v-btn
                >
                <v-btn class="ma-2" color="red" x-large dark rounded depressed>Remove</v-btn>
              </div>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="changeOwnerDialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" x-small outlined depressed :ripple="false" v-on="on"
              ><v-icon x-small left> mdi-swap-horizontal-bold </v-icon>Change Owner</v-btn
            >
          </template>

          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">
                Who would you like to change ownership to?
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex flex-column justify-center">
              <!-- TO PHILIP: ONLY FOR OWNERS AND IF NO TEAM MEMBERS, DELETE TEAM THEREAFTER -->
              <div class="pl-12 pr-12 mt-4">
                <v-select
                  class=""
                  hide-details
                  outlined
                  rounded
                  x-large
                  label="Assign Ownership"
                ></v-select>
              </div>
              <div class="d-flex flex-row justify-center mt-4 mb-6">
                <v-btn
                  class="ma-2"
                  outlined
                  x-large
                  rounded
                  depressed
                  @click="changeOwnerDialog = false"
                  >Cancel</v-btn
                >
                <v-btn class="ma-2" color="green" x-large dark rounded depressed
                  ><v-icon left>mdi-swap-horizontal-bold</v-icon>Change Owner</v-btn
                >
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.accessChoice>
        <v-text-field outlined></v-text-field>
      </template>

      <template v-slot:item.avatar>
        <v-avatar size="32"><img src="https://picsum.photos/510/300?random" /></v-avatar>
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
    return {
      header: ref(MANAGEHEADER),
      manageitems,
      removeMemberDialog: false,
      changeOwnerDialog: false
    };
  }
};
</script>
