<template>
  <div class="module-default__team-row mb-3 mt-3">
    <div>
      <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
        <template #activator>
          <v-tooltip v-if="numMembers >= maxTeamMembers" top>
            <template #activator="{ on }">
              <div v-on="on">
                <v-btn
                  :ripple="false"
                  rounded
                  depressed
                  small
                  outlined
                  class="module-default__team-buttons mr-3 font-weight-black"
                  disabled
                  @click="joinTeamDialog = true"
                  >{{ team.data.name }}</v-btn
                >
              </div>
            </template>
            <span>Team is full</span>
          </v-tooltip>
          <v-btn
            v-if="numMembers < maxTeamMembers"
            :ripple="false"
            rounded
            depressed
            small
            outlined
            class="module-default__team-buttons mr-3 font-weight-black"
            @click="joinTeamDialog = true"
            >{{ team.data.name }}</v-btn
          >
        </template>

        <v-card>
          <v-card-title class="d-flex flex-column">
            <div class="overline font-weight-bold">Enter password to join team</div>
          </v-card-title>

          <v-divider></v-divider>

          <v-container class="d-flex justify-center">
            <div class="d-flex flex-column justify-center">
              <div class="d-flex flex-row justify-center mt-6">
                <v-text-field
                  v-model="password"
                  class="justify-center ma-2"
                  x-large
                  :error-messages="error"
                  rounded
                  label="Enter password"
                  outlined
                ></v-text-field>
                <v-btn class="ma-2" x-large dark rounded depressed @click="joinTeam"
                  >Join Team</v-btn
                >
              </div>
              <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

              <div class="d-flex justify-center mt-3 mb-3">
                <v-btn icon @click="joinTeamDialog = false"><v-icon>mdi-close</v-icon></v-btn>
              </div>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
    <v-avatar
      v-for="member in team.data.members"
      :key="member.firstName + member.lastName"
      class="module-default__team-avatar ml-1 mr-1"
      size="28"
      ><img src="https://picsum.photos/510/300?random"
    /></v-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, computed } from '@vue/composition-api';
import { TeamDoc } from '../types';

export default defineComponent({
  name: 'TeamRow',
  props: {
    team: {
      required: true,
      type: Object as PropType<TeamDoc>
    },
    maxTeamMembers: {
      required: true,
      type: Number
    }
  },
  setup(props, ctx) {
    const state = reactive({
      joinTeamDialog: false,
      password: '',
      error: ''
    });
    const joinTeam = () => {
      if (state.password === props.team.data.password) ctx.emit('joinTeam', props.team.data._id);
      else state.error = 'Incorrect password! Please try again!';
    };
    const numMembers = computed(() => props.team.data.members.length);
    return { joinTeam, numMembers, ...toRefs(state) };
  }
});
</script>
