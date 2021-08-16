<template>
  <v-container class="myContainer">
    <List></List>
  </v-container>
</template>

<style scoped>
  .myContainer {
    max-width: 80%
  }
</style>

<script>
import List from '@/components/List'
export default {
  name : 'list',
  components: {List},
  data : () => {
    return {

    }
  }
}
</script>