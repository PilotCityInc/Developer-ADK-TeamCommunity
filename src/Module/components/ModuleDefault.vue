<template>
  <v-container class="module-default__container">
    <div class="module-default__instructions">
      <v-expansion-panels v-model="showInstructions" class="module-default__instructions" flat>
        <v-expansion-panel>
          <v-expansion-panel-header
            v-show="showInstructions"
            hide-actions
            class="pa-0"
            @click="showInstructions = true"
          >
            <template #default="{ open }">
              <v-scroll-y-transition hide-on-leave>
                <div v-if="!open" class="d-flex flex-column justify-center">
                  <v-icon color="grey lighten-2" class="d-flex justify-center">
                    mdi-chevron-down
                  </v-icon>
                  <div color="grey lighten-2" class="module-default__collapse-title">
                    INSTRUCTIONS
                  </div>
                </div>
              </v-scroll-y-transition>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <Instruct readonly />
            <div @click="showInstructions = true">
              <div class="module-default__collapse-title">CLOSE</div>
              <!-- <div class="hr"/> OPTIONAL -->
              <v-icon color="grey lighten-2" class="d-flex justify-center"> mdi-chevron-up </v-icon>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <v-progress-linear
      class="module-default__collapse-divider"
      color="#dedede"
      height="2"
      value="100"
      buffer-value="100"
      stream
    />
    <div class="module-edit__container">
      <!-- Viewer is not a member of a team -->
      <div v-if="!teamDoc">
        <JoinTeam :teams="teams" @joinTeam="joinTeam" />
        <CreateTeam @createTeam="createTeam" />
      </div>
      <!-- Viewer is a member of a team -->
      <Team
        v-if="teamDoc"
        :viewer="user"
        :teamDoc="teamDoc"
        @changeOwner="changeOwner"
        @removeMember="removeMember"
        @changePassword="changePassword"
        @renameTeam="renameTeam"
        @leaveTeam="leaveTeam"
      />
      <!-- ENTER CONTENT HERE -->
      <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
      <!-- <div class="module-default__none">Design your activity here</div> -->
    </div>
  </v-container>
</template>
<script lang="ts">
import { reactive, toRefs } from '@vue/composition-api';
import Instruct from './ModuleInstruct.vue';
import CreateTeam from './CreateTeam.vue';
import JoinTeam from './JoinTeam.vue';
import Team from './Team.vue';
import { TeamDoc } from '../types';

const dummyTeams = new Array(35).fill().map((e, i) => {
  return {
    data: {
      id: i,
      owner: 1,
      name: `Team ${i}`,
      password: '123',
      members: [
        {
          data: {
            id: 1,
            name: 'Team member 1'
          }
        }
      ]
    }
  };
});

export default {
  name: 'ModuleDefault',
  components: {
    Instruct,
    JoinTeam,
    CreateTeam,
    Team
  },
  setup() {
    const state = reactive({
      setupInstructions: {
        description: '',
        instructions: ['', '', '']
      },
      showInstructions: true,
      teams: dummyTeams,
      user: {
        data: {
          id: 2,
          name: 'me',
          team: null as null | number
        }
      },
      teamDoc: null
    });

    state.teams.unshift({
      data: {
        id: 1,
        owner: 3,
        name: `Team Yeezy`,
        password: '123',
        members: [
          {
            data: {
              id: 1,
              name: 'Team member 1'
            }
          },
          {
            data: {
              id: 3,
              name: 'kanye'
            }
          },
          {
            data: {
              id: 4,
              name: 'travis'
            }
          }
        ]
      }
    });

    const joinTeam = (team: TeamDoc) => {
      team.data.members.push(state.user);
      state.user.data.team = team.data.id;
      state.teamDoc = team;
    };

    const createTeam = (name: string, password: string) => {
      const id = Math.floor(Math.random() * 100 + 42);
      const team = {
        data: {
          id,
          owner: state.user.data.id,
          name,
          password,
          members: [
            {
              data: {
                id: 3,
                name: 'my other teammate'
              }
            },
            {
              data: {
                id: 4,
                name: 'my teammate'
              }
            }
          ]
        }
      };
      state.teams.unshift(team);
      joinTeam(team);
    };

    const removeMember = (id: number) => {
      state.teamDoc.data.members.splice(
        state.teamDoc.data.members.findIndex(member => {
          return member.data.id === id;
        }),
        1
      );
    };

    const changeOwner = (id: number) => {
      state.teamDoc.data.owner = id;
    };

    const changePassword = (password: string) => {
      state.teamDoc.data.password = password;
    };

    const renameTeam = (name: string) => {
      state.teamDoc.data.name = name;
    };

    const leaveTeam = (viewerId: number, newOwnerId?: number) => {
      if (newOwnerId) changeOwner(newOwnerId);
      removeMember(viewerId);
      // Remove team if empty
      if (state.teamDoc.data.members.length === 0)
        state.teams.splice(
          state.teams.findIndex(team => {
            return team.data.id === state.teamDoc.data.id;
          }),
          1
        );
      state.user.data.team = null;
      state.teamDoc = null;
    };

    return {
      ...toRefs(state),
      joinTeam,
      createTeam,
      removeMember,
      changeOwner,
      changePassword,
      renameTeam,
      leaveTeam
    };
  }
};
</script>

<style lang="scss">
.module-default {
  &__upper-body {
    display: flex;
    width: 100%;
  }
  &__team {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    // margin-left: 5.4%;
    &-buttons {
      margin-bottom: 10px;
      &.v-btn:not(.v-btn--round).v-size--default {
        width: 250px;
      }
    }
  }

  &__team-avatar {
  }
  &__team-row {
    flex-direction: row;
    display: flex;
    // justify-content: center !important;
    // align-items: center !important;
    // align-content: center !important;
  }
  &__log-text {
    display: flex;
  }
  &__text-field {
    &.v-text-field {
      width: 400px;
    }
  }
  &__log-btn {
    &.v-btn:not(.v-btn--round).v-size--default {
      min-height: 57px;
    }
    margin-left: 20px;
    height: 100%;
  }
  &__table-view {
    width: 100%;
    // padding-left: 10px;
    // padding-right: 10px;
    margin-bottom: 20px;
  }
  &__none {
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

  &__collapse-divider {
    margin-top: 15px;
    margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }

  &__collapse-title {
    color: #dedede;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 13px;
    //  text-uppercase font-weight-bold text-subtitle-2 text-center
  }

  &__container {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }

  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    height: 400px;
    width: 95%;
    border-radius: 25px;
    // margin: 0px;
    background-color: #dedede;

    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
  }
  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }

  &__faq-avatar {
    margin: 5px;
  }

  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }

  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }

  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }

  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }

  &__specs-title {
    font-weight: 800;
  }
}
</style>
