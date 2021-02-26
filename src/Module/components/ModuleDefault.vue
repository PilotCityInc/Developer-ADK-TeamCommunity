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
            <template v-slot="{ open }">
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
      <div class="module-default__manage-title text-h5 font-weight-black">Join</div>
      <!--buttons for the  team -->
      <div class="module-default__upper-body">
        <div class="module-default__team">
          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-btn
                :ripple="false"
                rounded
                depressed
                small
                dark
                class="module-default__team-buttons mr-3"
                >Team Yeezy</v-btn
              >
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
          </div>
          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-btn
                :ripple="false"
                rounded
                depressed
                small
                dark
                class="module-default__team-buttons mr-3"
                >Team Easy</v-btn
              >
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
          </div>
          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-btn
                :ripple="false"
                rounded
                depressed
                small
                dark
                class="module-default__team-buttons mr-3"
                >Team Peezy</v-btn
              >
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-2 mr-2" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </div>
          </div>
        </div>
      </div>
      <div class="module-default__manage-title text-h5 font-weight-black mt-6">Create</div>
      <div class="module-default__log-text mb-5 mt-5">
        <v-text-field
          rounded
          class="module-default__text-field"
          placeholder="Enter new team name"
          outlined
        ></v-text-field>
        <v-btn rounded class="module-default__log-btn" depressed outlined :ripple="false"
          >Create Team</v-btn
        >
      </div>

      <div class="module-default__manage">
        <div class="module-default__manage-title text-h5 font-weight-black mb-3">Manage</div>
        <ManageTable class="module-default__table-view"></ManageTable>
      </div>

      <!-- <div class="module-default__new">
        <div class="module-default__manage-new text-h5 font-weight-black">New</div>
        <NewTable class="module-default__table-view"></NewTable>
      </div> -->
      <div class="module-default__manage-title text-h5 font-weight-black mb-3">Rename</div>
      <div class="module-default__log-text mb-5 mt-5">
        <v-text-field
          rounded
          class="module-default__text-field"
          placeholder="Rename team name"
          outlined
        ></v-text-field>
        <v-btn rounded class="module-default__log-btn" depressed outlined :ripple="false"
          >Rename Team</v-btn
        >
      </div>

      <v-btn rounded large color="red" dark depressed>Leave Team</v-btn>

      <!-- ENTER CONTENT HERE -->
      <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
      <!-- <div class="module-default__none">Design your activity here</div> -->
    </div>
  </v-container>
</template>
<script lang="ts">
import { ref } from '@vue/composition-api';
import Instruct from './ModuleInstruct.vue';
import ManageTable from './ManageTable.vue';
// import NewTable from './NewTable.vue';

export default {
  name: 'ModuleDefault',
  components: {
    Instruct,
    ManageTable
    // NewTable
  },
  apollo: {},
  data() {
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    const showInstructions = ref(true);
    return {
      setupInstructions,
      showInstructions
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
