<template>
  <v-app>
    <!-- header -->
    <v-app-bar app dark tag="header">
      <v-app-bar-nav-icon @click="draw = !draw" />
      <v-toolbar-title>Tessa</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="draw" dark >
      <v-list-item two-line dense>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold text-lg-h6 text-center">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />

      <v-list rounded>
        <v-list-item-group>
          <v-list-item v-for="item in drawItems" :key="item.title" link :to="item.link">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main tag="content">
      <router-view />
    </v-main>

    <v-footer app dark height="60px" absolute padless>
      <v-spacer></v-spacer>
      {{ new Date().getFullYear() }} —
      <strong>Jimin</strong>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    draw : null,
    loginUser : null,
    avatar : 'https://avatars2.githubusercontent.com/u/67082137?s=460&u=f69e0bb8fbf80e5c67c541ae99bd4868100a5e17&v=4',
    drawItems : [
      { title: "Home", icon: "mdi-home-city", link : '/'},
      { title : 'List', icon : 'mdi-format-list-bulleted', link : '/list'},
      { title : 'Upload', icon : 'mdi-upload', link : '/upload'},
      { title : 'Uplaod & List', icon : 'mdi-code-string', link : '/test'}
    ],
  }),
  methods : {
    
  }
};
</script>