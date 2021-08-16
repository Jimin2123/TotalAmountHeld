<template>
  <v-card>
    <v-expansion-panels accordion v-model="panel">
      <v-expansion-panel v-for="item in tid" :key="item">
        <v-expansion-panel-header>
          {{item.tid}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table :headers="headers" :items="userToken" :items-per-page="10" class="elevation-1" v-if="panel != null"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name : 'list',
  data() {
    return {
      userToken: [],
      headers : [
        {
          text: 'userID',
          value: 'userID',
          align: 'start'
        },
        {
          text: 'tokenID',
          value: 'tokenID'
        },
        {
          text: 'tokenAddress',
          value: 'tokenAddress'
        },
        {
          text: 'amountHeld',
          value: 'amountHeld'
        }
      ],
      tid : [],
      panel : []
    }
  },
  methods : {
    getTid() {
      axios.get('/tid').then(res => {
        const data = res.data;
        this.tid = data;
      });
    }
  },
  beforeMount() {
    this.getTid();
  },
  watch : {
    panel : function(data) {
      if(data == undefined) {
        this.userToken = [];
      }else {
        axios.get('/data',{params: {tid : this.tid[data].tid}}).then(res => {
          const data = res.data;
          this.userToken = data;
        });
      }
    },
  }
}
</script>