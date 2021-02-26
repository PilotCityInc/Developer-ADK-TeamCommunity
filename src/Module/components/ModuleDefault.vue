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
      <div class="headline font-weight-black mb-6">Join</div>
      <!--buttons for the  team -->
      <div class="module-default__upper-body">
        <div class="module-default__team">
          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>
          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>
          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-2 mr-2" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>

          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>

          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>

          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>

          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>

          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>

          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>

          <div class="module-default__team-row mb-3 mt-3">
            <div>
              <v-dialog v-model="joinTeamDialog" persistent max-width="450px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    :ripple="false"
                    rounded
                    depressed
                    small
                    outlined
                    class="module-default__team-buttons mr-3 font-weight-black"
                    v-on="on"
                    >Team Yeezy</v-btn
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
                          class="justify-center ma-2"
                          x-large
                          rounded
                          label="Enter password"
                          outlined
                          hide-details
                        ></v-text-field>
                        <v-btn class="ma-2" x-large dark rounded depressed>Join Team</v-btn>
                      </div>
                      <!-- <div class="d-flex headline justify-center mt-6 mb-6">Or</div>

                      <v-btn class="ma-2" x-large dark rounded depressed>Request to Join</v-btn> -->

                      <div class="d-flex justify-center mt-3 mb-3">
                        <v-btn icon @click="joinTeamDialog = false"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </div>
                    </div>
                  </v-container>
                </v-card>
              </v-dialog>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
            <div>
              <v-avatar class="module-default__team-avatar ml-1 mr-1" size="28"
                ><img src="https://picsum.photos/510/300?random"
              /></v-avatar>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-10 d-flex justify-start">
        <v-pagination :length="3" circle></v-pagination>
      </div>
      <div class="headline font-weight-black mb-6 mt-6">Create</div>
      <div class="module-default__log-text mb-5 mt-5">
        <v-text-field
          rounded
          class="module-default__text-field"
          label="Create new team"
          placeholder="Enter new team name"
          outlined
        ></v-text-field>

        <v-dialog v-model="createTeamDialog" persistent max-width="450px">
          <template v-slot:activator="{ on, attrs }">
            <!-- TO PHILIP: DISABLE BUTTON UNLESS TEAM NAME IS FILLED -->
            <v-btn
              v-bind="attrs"
              rounded
              class="module-default__log-btn"
              depressed
              outlined
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
                  class="justify-center ma-2"
                  x-large
                  rounded
                  label="Enter password"
                  outlined
                  hide-details
                ></v-text-field>
                <!-- TO PHILIP: WHEN SET PASSWORD, GO DIRECTLY INTO MANAGE TEAM -->
                <v-btn class="ma-2" x-large dark rounded depressed>Set Password</v-btn>

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

      <div class="module-default__manage">
        <div class="headline font-weight-black mb-3">Team Yeezy</div>
        <ManageTable class="module-default__table-view"></ManageTable>
      </div>

      <!-- <div class="module-default__new">
        <div class="module-default__manage-new text-h5 font-weight-black">New</div>
        <NewTable class="module-default__table-view"></NewTable>
      </div> -->
      <div class="headline font-weight-black mb-3 mt-6">Settings</div>
      <div class="module-default__log-text mb-5 mt-5">
        <v-text-field
          rounded
          class="module-default__text-field"
          label="Rename team name"
          placeholder="(add current team name here)"
          outlined
        ></v-text-field>

        <v-dialog v-model="renameTeamDialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
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
                <v-btn class="ma-2" color="green" x-large dark rounded depressed>Confirm</v-btn>
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </div>

      <div class="module-default__log-text">
        <v-text-field
          v-model="password"
          rounded
          class="module-default__text-field"
          label="View, copy or change password"
          outlined
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-dialog v-model="changePasswordDialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
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
                <v-btn class="ma-2" color="green" x-large dark rounded depressed>Confirm</v-btn>
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </div>

      <div class="d-flex flex-row justify-start mt-6">
        <v-dialog v-model="leaveTeamDialog" persistent max-width="500px">
          <template v-slot:activator="{ on, attrs }">
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
              <!-- TO PHILIP: ONLY FOR OWNERS AND IF NO TEAM MEMBERS, DELETE TEAM THEREAFTER -->
              <div class="pl-12 pr-12 mt-4">
                <v-select
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
                <v-btn class="ma-2" color="red" x-large dark rounded depressed
                  ><v-icon left>mdi-hand-peace</v-icon>Leave Team</v-btn
                >
              </div>
            </v-container>
          </v-card>
        </v-dialog>
      </div>
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
      showInstructions,
      joinTeamDialog: false,
      createTeamDialog: false,
      renameTeamDialog: false,
      leaveTeamDialog: false,
      changePasswordDialog: false,
      show1: false,
      password: 'Password'
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
