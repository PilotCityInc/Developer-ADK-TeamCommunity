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
import { reactive, toRefs, computed } from '@vue/composition-api';
import TeamRow from './TeamRow.vue';

const MAX_TEAMS_PER_PAGE = 10;

export default {
  name: 'JoinTeam',
  components: { TeamRow },
  props: {
    teams: {
      required: true,
      type: Array
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
};
</script>
