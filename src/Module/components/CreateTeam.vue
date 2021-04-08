<template>
  <div>
    <div class="headline font-weight-black mb-6 mt-6">Create</div>
    <div class="d-flex flex-row justify-start mt-5 mb-5">
      <div>
        <v-text-field
          v-model="name"
          :disabled="userType === 'stakeholder'"
          rounded
          class="module-default__text-field"
          label="Create new team"
          placeholder="Enter new team name"
          outlined
        ></v-text-field>
      </div>
      <div>
        <v-dialog v-model="createTeamDialog" persistent max-width="450px">
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              rounded
              class="module-default__log-btn"
              depressed
              x-large
              outlined
              :disabled="name.length === 0 || userType === 'stakeholder'"
              :ripple="false"
              v-on="on"
              >Create Team</v-btn
            >
          </template>

          <v-card>
            <v-card-title class="d-flex flex-column">
              <div class="overline font-weight-bold">Create password for new team members</div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="d-flex justify-center">
              <div class="d-flex flex-column justify-center">
                <v-text-field
                  v-model="password"
                  :readonly="userType === 'stakeholder'"
                  class="justify-center ma-2"
                  x-large
                  rounded
                  label="Enter password"
                  outlined
                  hide-details
                ></v-text-field>
                <v-btn
                  class="ma-2"
                  x-large
                  :dark="password.length > 0"
                  rounded
                  depressed
                  :disabled="password.length === 0 || userType === 'stakeholder'"
                  @click="createTeam"
                  >Set Password</v-btn
                >

                <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                        <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                <div class="d-flex justify-center mt-3 mb-3">
                  <v-btn icon @click="createTeamDialog = false"><v-icon>mdi-close</v-icon></v-btn>
                </div>
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'CreateTeam',
  props: {
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },
  setup(_props, ctx) {
    const state = reactive({
      name: '',
      password: '',
      createTeamDialog: false
    });
    const createTeam = () => {
      ctx.emit('createTeam', state.name, state.password);
      state.createTeamDialog = false;
      state.name = '';
    };
    return { ...toRefs(state), createTeam };
  }
});
</script>
