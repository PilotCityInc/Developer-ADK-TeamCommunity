<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="teamMembers"
      sort-by="resource"
      :items-per-page="100"
      :hide-default-footer="true"
    >
      <template #[`item.avatar`]>
        <v-avatar size="32"><img src="https://picsum.photos/510/300?random" /></v-avatar>
      </template>
      <template #[`item.access`]="{ item }">
        {{ isOwner(item) ? 'Owner' : 'Member' }}
      </template>
      <template v-if="viewer.data.id === teamDoc.data.owner" #[`item.action`]="{ item }">
        <v-btn
          v-if="!isOwner(item)"
          x-small
          outlined
          depressed
          :ripple="false"
          @click="(removeMemberDialog = true), (selectedMember = item.data.id)"
          ><v-icon x-small left> mdi-close-circle </v-icon>Remove</v-btn
        >

        <v-btn
          v-if="isOwner(item)"
          x-small
          outlined
          depressed
          :ripple="false"
          @click="changeOwnerDialog = true"
          ><v-icon x-small left> mdi-swap-horizontal-bold </v-icon>Change Owner</v-btn
        >
      </template>
    </v-data-table>
    <v-dialog v-model="removeMemberDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="d-flex flex-column">
          <div class="overline font-weight-bold">Are you sure you want to remove team member?</div>
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
            <v-btn class="ma-2" color="red" x-large dark rounded depressed @click="removeMember"
              >Remove</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="changeOwnerDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="d-flex flex-column">
          <div class="overline font-weight-bold">Who would you like to change ownership to?</div>
        </v-card-title>

        <v-divider></v-divider>

        <v-container class="d-flex flex-column justify-center">
          <div class="pl-12 pr-12 mt-4">
            <v-select
              v-model="selectedMember"
              class=""
              hide-details
              :items="teamMembersExceptOwner"
              :item-value="'data.id'"
              :item-text="'data.name'"
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

            <v-btn
              class="ma-2"
              color="green"
              x-large
              :dark="selectedMember !== null"
              rounded
              depressed
              :disabled="!selectedMember"
              @click="changeOwner"
              ><v-icon left>mdi-swap-horizontal-bold</v-icon>Change Owner</v-btn
            >
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, reactive, toRefs } from '@vue/composition-api';
import { TeamDoc } from '../types';

export default defineComponent({
  name: 'ManageTable',
  props: {
    teamDoc: {
      required: true,
      type: Object as PropType<TeamDoc>
    },
    viewer: {
      required: true,
      type: Object
    }
  },
  setup(props, ctx) {
    const state = reactive({
      selectedMember: null as null | number,
      removeMemberDialog: false,
      changeOwnerDialog: false
    });
    const isOwner = (item: Record<'data', Record<string, any>>) => {
      return item.data.id === props.teamDoc.data.owner;
    };
    const tableHeaders = computed(() => {
      const headers = [
        { text: '', align: 'start', value: 'avatar', width: '5%' },
        { text: 'Name', align: 'start', value: 'data.name', width: '50%' },
        { text: 'Access', align: 'start', value: 'access', sortable: false, width: '20%' },
        { text: 'Action', align: 'start', value: 'action', sortable: false, width: '25%' }
      ];
      if (isOwner(props.viewer)) return headers;
      return headers.filter(column => column.value !== 'action');
    });
    const teamMembers = computed(() => {
      return props.teamDoc.data.members.slice().sort(member => {
        return isOwner(member) ? -1 : 1;
      });
    });
    const teamMembersExceptOwner = computed(() => {
      return props.teamDoc.data.members.filter(member => {
        return !isOwner(member);
      });
    });
    const removeMember = () => {
      ctx.emit('removeMember', state.selectedMember);
      state.removeMemberDialog = false;
      state.selectedMember = null;
    };
    const changeOwner = () => {
      if (state.selectedMember) {
        ctx.emit('changeOwner', state.selectedMember);
        state.changeOwnerDialog = false;
        state.selectedMember = null;
      }
    };
    return {
      tableHeaders,
      teamMembers,
      teamMembersExceptOwner,
      isOwner,
      removeMember,
      changeOwner,
      ...toRefs(state)
    };
  }
});
</script>
