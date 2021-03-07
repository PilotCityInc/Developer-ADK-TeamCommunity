<template>
  <v-app>
    <Module
      v-model="programDocStub"
      :db="db"
      :team-doc="teamDoc"
      :student-doc="studentDoc"
      @inputTeamDoc="teamDoc = $event"
      @inputStudentDoc="studentDoc = $event"
    />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { Db } from 'mongodb';
import { ObjectId } from 'bson';
import Module from './Module/Module.vue';
import { MongoDoc } from './Module/types';

const dummyTeams = new Array(35).fill().map((e, i) => {
  const ownerId = new ObjectId(1);
  return {
    _id: new ObjectId(i),
    owner: ownerId,
    name: `Team ${i}`,
    password: '123',
    members: [
      {
        _id: ownerId,
        firstName: 'Team member',
        lastName: '1'
      }
    ]
  };
});
const yeezyOwner = new ObjectId(3);
dummyTeams.unshift({
  _id: new ObjectId(10),
  owner: yeezyOwner,
  name: `Team Yeezy`,
  password: '123',
  members: [
    {
      _id: new ObjectId(1),
      firstName: 'Team member',
      lastName: '1'
    },
    {
      _id: yeezyOwner,
      firstName: 'kanye',
      lastName: 'east'
    },
    {
      _id: new ObjectId(4),
      firstName: 'travis',
      lastName: 'scott'
    },
    {
      _id: new ObjectId(5),
      firstName: 'wqe',
      lastName: 'qwe'
    },
    {
      _id: new ObjectId(9),
      firstName: 'rew',
      lastName: 'qwe'
    }
  ]
});

export default defineComponent({
  name: 'App',
  components: {
    Module
  },
  setup() {
    const teams = ref(dummyTeams);
    const db: Db = ({
      collection(name) {
        return {
          find(query) {
            return {
              toArray() {
                return new Promise((resolve, reject) => resolve(teams.value));
              }
            };
          },
          findOne({ _id }) {
            return new Promise((resolve, reject) =>
              resolve(teams.value.filter(obj => obj._id.equals(_id))[0])
            );
          },
          insertOne(doc) {
            const _id = new ObjectId(Math.floor(Math.random() * 100 + 42));
            teams.value.push({ _id, ...doc });
            return new Promise((resolve, reject) => resolve({ insertedId: _id }));
          },
          updateOne({ _id }, query) {
            return new Promise((resolve, reject) => {
              if (!('$push' in query)) resolve(true);
              const {
                $push: { members }
              } = query;
              const team = teams.value.filter(obj => obj._id.equals(_id))[0];
              team.members.push(members);
              resolve(true);
            });
          },
          deleteOne({ _id }) {
            return new Promise((resolve, reject) => {
              teams.value = teams.value.filter(obj => !obj._id.equals(_id));
              resolve(true);
            });
          }
        };
      }
    } as unknown) as Db;

    const programDocStub: Ref<MongoDoc> = ref({
      data: {
        adks: []
      },
      update: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    const myTeamOwner = new ObjectId(3);
    const teamDoc: Ref<MongoDoc> = ref({
      data: {
        name: 'Team Cool',
        _id: new ObjectId(1),
        owner: myTeamOwner,
        password: '123',
        members: [
          {
            _id: new ObjectId(1),
            firstName: 'Team member 1',
            lastName: 'awesome'
          },
          {
            _id: myTeamOwner,
            firstName: 'kanye',
            lastName: 'east'
          },
          {
            _id: new ObjectId(4),
            firstName: 'travis',
            lastName: 'scott'
          }
        ]
      },
      update: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });

    const studentDoc: Ref<MongoDoc> = ref({
      data: {
        firstName: 'me',
        lastName: 'test',
        _id: new ObjectId(1),
        team: null as null | ObjectId,
        adks: []
      },
      update: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    return {
      programDocStub,
      studentDoc,
      teamDoc,
      db
    };
  }
});
</script>
