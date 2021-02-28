<template>
  <div>
    <div class="module-default__manage">
      <div class="headline font-weight-black mb-3">{{ teamDoc.data.name }}</div>
      <ManageTable
        class="module-default__table-view"
        :teamDoc="teamDoc"
        v-on="$listeners"
        :viewer="viewer"
      ></ManageTable>
    </div>

    <div v-if="viewerIsOwner">
      <div class="headline font-weight-black mb-3 mt-6">Settings</div>

      <div class="module-default__log-text mt-5 mb-5">
        <v-text-field
          v-model="password"
          rounded
          class="module-default__text-field"
          label="View, copy or change password"
          outlined
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-dialog v-model="changePasswordDialog" persistent max-width="500px">
          <template #activator="{ on, attrs }">
            <v-btn
              rounded
              v-bind="attrs"
              class="module-default__log-btn"
              depressed
              outlined
              :ripple="false"
              v-on="on"
              >Set Password</v-btn
            >
          </template>

          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">
                Are you sure you want to change the password?
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
                  @click="changePasswordDialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  class="ma-2"
                  color="green"
                  x-large
                  dark
                  rounded
                  depressed
                  @click="changePassword"
                  >Confirm</v-btn
                >
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </div>

      <div class="module-default__log-text">
        <v-text-field
          rounded
          class="module-default__text-field"
          label="Rename team name"
          :placeholder="teamDoc.data.name"
          v-model="newTeamName"
          outlined
        ></v-text-field>

        <v-dialog v-model="renameTeamDialog" persistent max-width="500px">
          <template #activator="{ on, attrs }">
            <v-btn
              rounded
              v-bind="attrs"
              class="module-default__log-btn"
              depressed
              outlined
              :ripple="false"
              v-on="on"
              >Rename Team</v-btn
            >
          </template>

          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">Are you sure you want to rename the team?</div>
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
                  @click="renameTeamDialog = false"
                  >Cancel</v-btn
                >
                <v-btn class="ma-2" color="green" x-large dark rounded depressed @click="renameTeam"
                  >Confirm</v-btn
                >
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <div class="d-flex flex-row justify-start mt-6">
      <v-dialog v-model="leaveTeamDialog" persistent max-width="500px">
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" rounded x-large color="red" dark depressed v-on="on"
            >Leave Team</v-btn
          >
        </template>

        <v-card>
          <v-card-title class="d-flex flex-column">
            <div class="overline font-weight-bold">Are you sure you want to leave the team?</div>
          </v-card-title>

          <v-divider></v-divider>

          <v-container class="d-flex flex-column justify-center">
            <div class="pl-12 pr-12 mt-4">
              <v-select
                v-if="viewerIsOwner && teamMembers.length > 0"
                v-model="selectedMember"
                :items="teamMembers"
                :item-text="'data.name'"
                :item-value="'data.id'"
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
                @click="leaveTeamDialog = false"
                >Cancel</v-btn
              >
              <v-btn
                class="ma-2"
                color="red"
                x-large
                :dark="selectedMember !== null || teamMembers.length < 1 || !viewerIsOwner"
                rounded
                depressed
                :disabled="viewerIsOwner && !selectedMember && teamMembers.length > 1"
                @click="leaveTeam"
                ><v-icon left>mdi-hand-peace</v-icon>Leave Team</v-btn
              >
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, computed } from '@vue/composition-api';
import ManageTable from './ManageTable.vue';
import { TeamDoc } from '../types';

export default defineComponent({
  name: 'Team',
  components: { ManageTable },
  props: {
    teamDoc: {
      required: true,
      type: Object as () => TeamDoc
    },
    viewer: {
      required: true,
      type: Object
    }
  },
  setup(props, ctx) {
    const state = reactive({
      renameTeamDialog: false,
      leaveTeamDialog: false,
      changePasswordDialog: false,
      newTeamName: '',
      selectedMember: null as null | number,
      password: props.teamDoc.data.password,
      showPassword: false
    });

    const viewerIsOwner = computed(() => {
      return props.viewer.data.id === props.teamDoc.data.owner;
    });

    const teamMembers = computed(() => {
      return props.teamDoc.data.members.filter(member => {
        return member.data.id !== props.teamDoc.data.owner;
      });
    });

    const changePassword = () => {
      ctx.emit('changePassword', state.password);
      state.changePasswordDialog = false;
      state.showPassword = false;
    };

    const renameTeam = () => {
      ctx.emit('renameTeam', state.newTeamName);
      state.renameTeamDialog = false;
      state.newTeamName = '';
    };

    const leaveTeam = () => {
      if (viewerIsOwner.value && !state.selectedMember && teamMembers.value.length > 1) return;
      ctx.emit('leaveTeam', props.viewer.data.id, state.selectedMember);
      state.leaveTeamDialog = false;
    };

    return {
      ...toRefs(state),
      viewerIsOwner,
      teamMembers,
      changePassword,
      renameTeam,
      leaveTeam
    };
  }
});
</script>
