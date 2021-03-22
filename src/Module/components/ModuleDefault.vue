<template>
  <v-container class="module-default pa-0">
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
      class="mt-3"
      color="#dedede"
      height="2"
      value="100"
      buffer-value="100"
      stream
    />
    <div class="module-edit__container mt-12">
      <!-- Viewer is not a member of a team -->
      <div v-if="!teamDocument">
        <JoinTeam
          :teams="teams"
          :max-team-members="adkData.maxTeamMembers"
          :user-type="userType"
          @joinTeam="joinTeam"
        />
        <CreateTeam :user-type="userType" @createTeam="createTeam" />
      </div>
      <!-- Viewer is a member of a team -->
      <Team
        v-if="teamDocument"
        :viewer="userDoc"
        :team-doc="teamDocument"
        :user-type="userType"
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
import { defineComponent, reactive, toRefs, PropType, computed } from '@vue/composition-api';
import { MongoDoc } from 'pcv4lib/src/types';
import { getModMongoDoc, getModAdk } from 'pcv4lib/src';
import { ObjectId } from 'bson';

import * as Realm from 'realm-web';
import Instruct from './ModuleInstruct.vue';
import CreateTeam from './CreateTeam.vue';
import JoinTeam from './JoinTeam.vue';
import Team from './Team.vue';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct,
    JoinTeam,
    CreateTeam,
    Team
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    teamDoc: {
      required: false,
      type: Object as PropType<MongoDoc>,
      default: () => {}
    },
    studentDoc: {
      required: false,
      type: Object as PropType<MongoDoc>,
      default: () => {}
    },
    userDoc: {
      required: false,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    db: {
      required: false,
      type: Object,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const state = reactive({
      setupInstructions: {
        description: '',
        instructions: ['', '', '']
      },
      showInstructions: true,
      teams: [] as MongoDoc[],
      programDoc: null as any,
      teamDocument: null as any,
      studentDocument: null as any
    });

    const { adkData } = getModAdk(props, ctx.emit, 'team');

    state.programDoc = getModMongoDoc(props, ctx.emit);
    if (props.teamDoc)
      state.teamDocument = getModMongoDoc(props, ctx.emit, {}, 'teamDoc', 'inputTeamDoc');
    else {
      state.teamDocument = computed({
        get: () => props.teamDoc,
        set: newVal => {
          ctx.emit('inputTeamDoc', newVal);
        }
      });
    }
    if (props.studentDoc)
      state.studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');

    const fetchTeams = async () => {
      const teams = await props.db
        .collection('ProgramTeam')
        .find({ program_id: state.programDoc?.data._id });
      state.teams = teams.map(team => {
        return {
          data: team
        };
      });
    };
    fetchTeams();
    const teamChangeStream = props.db.collection('ProgramTeam').watch({
      filter: {
        'fullDocument.program_id': state.programDoc?.data._id
      }
    });
    (async () => {
      // eslint-disable-next-line no-restricted-syntax
      for await (const change of teamChangeStream) {
        const changeIndex = state.teams.findIndex(team => {
          return team.data._id.toString() === change.documentKey._id.toString();
        });
        if (change.operationType === 'delete') state.teams.splice(changeIndex, 1);
        else state.teams.splice(changeIndex, 1, { data: change.fullDocument });
      }
    })();
    const joinTeam = async (_id: ObjectId) => {
      await props.db.collection('ProgramTeam').updateOne(
        { _id },
        {
          $addToSet: {
            members: {
              _id: props.userDoc?.data._id,
              firstName: props.userDoc?.data.firstName,
              lastName: props.userDoc?.data.lastName
            }
          }
        }
      );
      const team = await props.db.collection('ProgramTeam').findOne({ _id });
      state.teamDocument = { data: team };
    };

    const createTeam = async (name: string, password: string) => {
      const team = {
        owner: props.userDoc?.data._id,
        program_id: state.programDoc?.data._id,
        name,
        password,
        members: [],
        adks: []
      };
      const { insertedId } = await props.db.collection('ProgramTeam').insertOne(team);
      joinTeam(insertedId);
      //   await fetchTeams();
    };

    const removeMember = async (_id: ObjectId) => {
      state.teamDocument!.data.members.splice(
        state.teamDocument!.data.members.findIndex(member => {
          return member._id.equals(_id);
        }),
        1
      );
      await props.db
        .collection('ProgramTeam')
        .updateOne({ _id: state.teamDocument!.data._id }, { $pull: { members: { _id } } });
    };

    const changeOwner = async (_id: ObjectId) => {
      state.teamDocument!.data.owner = _id;
      await props.db
        .collection('ProgramTeam')
        .updateOne({ _id: state.teamDocument!.data._id }, { $set: { owner: _id } });
    };

    const changePassword = (password: string) => {
      state.teamDocument!.data.password = password;
      props.db
        .collection('ProgramTeam')
        .updateOne({ _id: state.teamDocument!.data._id }, { $set: { password } });
    };

    const renameTeam = (name: string) => {
      state.teamDocument!.data.name = name;
      props.db
        .collection('ProgramTeam')
        .updateOne({ _id: state.teamDocument!.data._id }, { $set: { name } });
    };

    const leaveTeam = async (viewerId: ObjectId, newOwnerId?: ObjectId) => {
      if (newOwnerId) changeOwner(newOwnerId);
      await removeMember(viewerId);
      // Remove team if empty
      if (state.teamDocument!.data.members.length === 0) {
        state.teams.splice(
          state.teams.findIndex(team => {
            return team.data._id === state.teamDocument!.data._id;
          }),
          1
        );
        await props.db.collection('ProgramTeam').deleteOne({ _id: state.teamDocument!.data._id });
        // await fetchTeams();
      }
      state.teamDocument = null;
    };

    return {
      adkData,
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
});
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
      // width: 400px;
    }
  }
  &__log-btn {
    &.v-btn:not(.v-btn--round).v-size--default {
      // min-height: 57px;
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
    // margin-bottom: 75px;
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
