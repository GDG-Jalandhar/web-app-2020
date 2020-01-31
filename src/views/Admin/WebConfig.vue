<template>
  <v-content>
    <v-container fluid>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-toolbar class="elevation-1">
               <v-toolbar-title>Web Main Config</v-toolbar-title>
               <v-spacer></v-spacer>
               <v-btn icon small>mdi-lead-pencil</v-btn>
          </v-toolbar>
        </v-col>
        <v-col cols="12" sm="6">
            <v-toolbar class="elevation-1">
               <v-toolbar-title>Web Footer Config</v-toolbar-title>
               <v-spacer></v-spacer>
               <v-btn icon small>mdi-lead-pencil</v-btn>
          </v-toolbar>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import firebase from "@/firebase";

export default {
  name: "WebConfig",
  data: () => ({}),
  methods: {
    loadData() {
      console.log("Content loaded");
    }
  },
  created() {
    console.log("created is Called");
    if (firebase.auth.currentUser) {
      this.loadData();
    } else {
      this.$router.replace("login");
    }
  }
};
</script>

<style>
</style>