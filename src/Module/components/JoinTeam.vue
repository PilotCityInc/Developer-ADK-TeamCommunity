<template>
  <div>
    <div class="headline font-weight-black mb-6">Join</div>
    <!--buttons for the  team -->
    <div class="module-default__upper-body">
      <div class="module-default__team">
        <TeamRow
          v-for="team in visibleTeams"
          :key="team.data.name"
          :team="team"
          :max-team-members="maxTeamMembers"
          v-on="$listeners"
        />
      </div>
    </div>
    <div class="mt-4 mb-10 d-flex justify-start">
      <v-pagination v-model="page" :length="numPages" circle></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, PropType } from '@vue/composition-api';
import { TeamDoc } from '../types';
import TeamRow from './TeamRow.vue';

const MAX_TEAMS_PER_PAGE = 10;

export default defineComponent({
  name: 'JoinTeam',
  components: { TeamRow },
  props: {
    teams: {
      required: true,
      type: Array as PropType<Array<TeamDoc>>
    },
    userType: {
      required: true,
      type: String,
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    maxTeamMembers: {
      required: true,
      type: Number
    }
  },
  setup(props, ctx) {
    const state = reactive({
      page: 1
    });
    const numPages = computed(() => Math.ceil(props.teams.length / MAX_TEAMS_PER_PAGE));
    const visibleTeams = computed(() =>
      props.teams.slice(
        (state.page - 1) * MAX_TEAMS_PER_PAGE,
        (state.page - 1) * MAX_TEAMS_PER_PAGE + MAX_TEAMS_PER_PAGE
      )
    );
    return {
      ...toRefs(state),
      visibleTeams,
      numPages
    };
  }
});
</script>
