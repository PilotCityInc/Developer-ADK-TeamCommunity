<template>
  <v-container class="module">
    <div class="module__navbar">
      <v-btn
        v-if="currentPage != 'preview' && userType === 'organizer'"
        class="module__navbar-button font-weight-bold"
        outlined
        small
        rounded
        depressed
        @click="currentPage = 'preview'"
        >Preview</v-btn
      >

      <v-btn
        v-if="currentPage == 'preview' && userType === 'organizer'"
        class="module__navbar-button font-weight-bold"
        dark
        small
        rounded
        depressed
        color="red"
        @click="currentPage = 'setup'"
        >Exit Preview</v-btn
      >
    </div>
    <div class="module__container" :style="{ 'border-color': getColor }">
      <div class="module__title">
        <div class="module__image rounded-circle">
          <v-icon light x-large :color="selectedColor">mdi-account-supervisor-circle</v-icon>
        </div>
        <div class="module__header text-md-h5 text-sm-subtitle-1 d-flex align-center">
          <input disabled :value="moduleName" type="text" class="module__header-text mb-5" />
        </div>
      </div>
      <div class="module__body">
        <v-progress-linear
          v-if="currentPage != 'preview'"
          color="#dedede"
          height="2"
          value="100"
          buffer-value="100"
          stream
        />
        <div v-if="currentPage != 'preview'" class="module__pagination">
          <div v-for="page in subpages" :key="page" :class="{ active: currentPage == page }">
            <div class="module__pagination-button--active" />
            <v-btn
              :ripple="false"
              class="module__pagination-button"
              elevation="0"
              color="#ffffff"
              height="40"
              small
              @click="currentPage = page"
            >
              {{ page }}
            </v-btn>
          </div>
        </div>
        <div class="module__page">
          <keep-alive>
            <component
              :is="getComponent"
              v-model="programDoc"
              :db="db"
              :team-doc="teamDoc"
              :student-doc="studentDoc"
              :user-doc="userDoc"
              :user-type="userType"
              @inputTeamDoc="$emit('inputTeamDoc', $event)"
              @inputStudentDoc="$emit('inputStudentDoc', $event)"
            />
          </keep-alive>
        </div>
      </div>
    </div>
    <!-- TIMELINE START -->

    <!-- <template>
      <v-container v-if="currentPage == 'preview'" style="max-width: 675px">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" small :color="selectedColor" dark depressed v-on="on"
              ><v-icon left>mdi-message-reply-text</v-icon>Chat with all</v-btn
            >
          </template>
          <v-card class="module__menu">
            <v-btn
              small
              color="white"
              class="module__chat-menu-button v-btn__content"
              tile
              depressed
            >
              <v-icon left color="#404142">mdi-account-group</v-icon>Stakeholders Only</v-btn
            >
            <v-divider></v-divider>
            <v-btn
              small
              color="white"
              class="module__chat-menu-button v-btn__content"
              tile
              depressed
            >
              <v-icon left color="#404142">mdi-account-cog</v-icon>Organizers Only</v-btn
            >
            <v-divider></v-divider>
            <v-btn
              small
              color="white"
              class="module__chat-menu-button v-btn__content"
              tile
              depressed
            >
              <v-icon left color="#404142">mdi-account-multiple</v-icon>Team Only</v-btn
            >

            <v-divider></v-divider>
            <v-btn
              small
              color="white"
              class="module__chat-menu-button v-btn__content"
              tile
              depressed
            >
              <v-icon left color="#404142">mdi-bullhorn</v-icon>All</v-btn
            >
          </v-card>
        </v-menu>
        <v-timeline dense clipped>
          <v-timeline-item fill-dot class="white--text mb-12" color="pink" large>
            <template v-slot:icon>
              <v-avatar
                ><img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
              /></v-avatar>
            </template>
            <v-text-field
              v-model="input"
              hide-details
              flat
              label="Leave a comment..."
              solo
              @keydown.enter="comment"
            >
              <template v-slot:append>
                <v-btn class="mx-0" outlined depressed @click="comment"> Post </v-btn>
              </template>
            </v-text-field>
          </v-timeline-item>

          <v-slide-x-transition group>
            <v-timeline-item
              v-for="event in timeline"
              :key="event.id"
              class="mb-3"
              color="pink"
              fill-dot
            >
              <template v-slot:icon>
                <v-avatar size="34"
                  ><img
                    src="https://media-exp1.licdn.com/dms/image/C5603AQEq9BL9NuOBAQ/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=XLeDuOV5B9rNOG4CrSQLh1sKeftfzBUwHd3M-y_CRKM"
                /></v-avatar>
              </template>
              <v-row justify="space-between">
                <v-col cols="7" v-text="event.text"></v-col>
                <v-col class="text-right" cols="3" v-text="event.time"></v-col>
                <v-col class="text-right" cols="2">
                  <v-btn small class="module__trash" icon
                    ><v-icon small color="grey" class="module__trash"
                      >mdi-trash-can-outline</v-icon
                    ></v-btn
                  >
                  <v-btn small class="module__trash" icon
                    ><v-icon small color="grey" class="module__trash">mdi-flag</v-icon></v-btn
                  ></v-col
                >
              </v-row>

              <v-btn class="" icon><v-icon color="grey lighten-2">mdi-thumb-up</v-icon></v-btn>

              <v-btn class="" icon><v-icon color="grey lighten-2">mdi-thumb-down</v-icon></v-btn>
            </v-timeline-item>
          </v-slide-x-transition>
        </v-timeline>
      </v-container>
    </template> -->
    <!-- TIMELINE END -->
  </v-container>
</template>

<script lang="ts">
import { computed, reactive, ref, toRefs, defineComponent, PropType } from '@vue/composition-api';
import { getModMongoDoc, getModAdk } from 'pcv4lib/src';
import '../styles/module.scss';
import { Db } from 'mongodb';
import { MongoDoc } from './types';
import ModuleMonitor from './components/ModuleMonitor.vue';
import ModuleSetup from './components/ModuleSetup.vue';
import ModulePresets from './components/ModulePresets.vue';
import ModuleDefault from './components/ModuleDefault.vue';

export default defineComponent({
  name: 'ModuleName',
  components: {
    ModuleMonitor,
    ModuleSetup,
    ModulePresets,
    'module-preview': ModuleDefault
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    teamDoc: {
      required: false,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    studentDoc: {
      required: false,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    userDoc: {
      required: false,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    db: {
      required: false,
      type: Object as PropType<Db>,
      default: () => {}
    },
    userType: {
      required: true,
      type: String
    }
  },
  setup(props, ctx) {
    const programDoc = getModMongoDoc(props, ctx.emit);
    const defaultTeamProps = {
      maxTeamMembers: 5
    };
    getModAdk(props, ctx.emit, 'team', defaultTeamProps);

    const moduleName = ref('Team');
    const page = reactive({
      subpages: ['Setup', 'Presets'],
      currentPage: 'Setup'
    });

    if (props.userType === 'organizer') {
      page.currentPage = 'Presets';
    } else {
      page.currentPage = 'preview';
    }

    const getComponent = computed(() => {
      return `module-${page.currentPage.toLowerCase()}`;
    });
    const color = reactive({
      pilotcityColors: [
        ['#6eba80', '#3c9dcd', '#ea6764'],
        ['#eda1bf', '#fec34b', '#bdbdbd'],
        ['#ae90b0', '#f79961', '#000000']
      ],
      // ENTER ACTIVITY COLOR
      selectedColor: '#eda1bf'
    });
    const getColor = computed(() => {
      return color.selectedColor.substring(0, 7);
    });
    const config = ref({
      description: '',
      instruct: ['']
    });
    const menu = ref(false);
    // timeline
    const timelineData = reactive({
      events: [] as {
        id: number;
        text: string;
        time: string;
      }[],
      input: '',
      nonce: 0
    });
    const timeline = computed(() => {
      return timelineData.events.slice().reverse();
    });
    function comment() {
      const time = new Date().toTimeString();
      timelineData.events.push({
        id: timelineData.nonce,
        text: timelineData.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents) => {
          return ` ${contents
            .split(' ')
            .map((v: string) => v.charAt(0))
            .join('')}`;
        })
      });
      timelineData.input = '';
    }
    return {
      programDoc,
      ...toRefs(color),
      ...toRefs(page),
      ...toRefs(timelineData),
      config,
      moduleName,
      menu,
      getComponent,
      getColor,
      timeline,
      comment
    };
  }
});
</script>

<style lang="scss">
html,
body {
  font-family: 'Raleway';
  font-size: 16px;
  width: 100%;
  height: 100%;
}

.module {
  &__trash {
    // justify-content: start;
    align-items: start;
    // align-content: start;
  }

  &__header-chips {
    padding-bottom: 15px;
  }
}

.v-btn__content.module__chat-menu-button {
  justify-content: left;
  width: 100%;
}
.module__menu {
  .v-color-picker {
    &__controls {
      display: none;
    }
  }
}
</style>
