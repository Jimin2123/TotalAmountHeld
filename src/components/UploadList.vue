<template>
  <v-card v-if="list.length > 0" class="mt-12">
    <v-card-title class="red accent-2 title white--text">TID : {{tid}} </v-card-title> 
    <v-simple-table dense height="500" fixed-header>
      <thead>
        <tr>
          <th>userID</th>
          <th>tokenAddress</th>
          <th>amountHeld</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,idx) in list" :key="idx">
          <td >{{item.userID}}</td>
          <td>{{item.tokenAddress}}</td>
          <td>{{item.amountHeld}}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name : 'upload_list',
  props : ['list','tid'],
  data : () => {
    return {
      
    }
  },
  computed : {
  }
}
</script>