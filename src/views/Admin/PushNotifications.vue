<template>
  <v-content>
    <v-snackbar :timeout="5000" v-model="isSnackbar" bottom right>
      {{ snackBarText }}
      <v-btn color="pink" text @click="isSnackbar = false">Close</v-btn>
    </v-snackbar>
    <v-container fluid class="text-center">
      <v-row justify="center" align="center">
        <v-col cols="12" md="11">
          <v-toolbar class="elevation-1">
            <v-toolbar-title class="google-font">PushNotifications Details:</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-text-field
              flat
              v-model="search"
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-search-web"
              label="Search"
              single-line
              class="hidden-sm-and-down google-font"
            ></v-text-field>
            <addNotification @addedSuccess="addedd" />
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12" md="11">
          <v-data-table
            :headers="headers"
            :items="pushData"
            :items-per-page="10"
            :search="search"
            class="elevation-1 google-font"
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="view(item)">mdi-eye</v-icon>
              <v-icon small class="mr-2" @click="edit(item)">mdi-lead-pencil</v-icon>
              <v-icon small @click="send(item)">mdi-send</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

    <!-- View Dialog -->
    <v-dialog v-model="viewDialog" width="800" scrollable>
      <v-card>
        <v-card-title class="headline google-font" primary-title>{{ dialogData.title }}</v-card-title>

        <v-card-text>
          <v-row align="center">
            <v-col cols="12" md="7">
              <p class="google-font">
                <span style="font-weight:500" class="black--text">Body:</span>
                {{ dialogData.body }}
              </p>
              <p class="google-font">
                <span style="font-weight:500" class="black--text">Number of times Sent:</span>
                {{ dialogData.noTimeSend }}
              </p>
              <p class="google-font">
                <span style="font-weight:500" class="black--text">Created on :</span>
                {{ getDate(dialogData.createdOn) }}
              </p>
              <p class="google-font">
                <span style="font-weight:500" class="black--text">Last Sent on :</span>
                {{ getDate(dialogData.sentTime) }}
              </p>
              <p class="google-font">
                <span style="font-weight:500" class="black--text">EventID:</span>
                {{ dialogData.eventID }}
              </p>
              <p class="google-font">
                <span style="font-weight:500" class="black--text">RegLink:</span>
                {{ dialogData.regLink }}
              </p>
            </v-col>
            <v-col cols="12" md="5">
              <v-img :src="dialogData.image" max-height="300" contain></v-img>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="viewDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" width="800" scrollable>
      <v-card>
        <v-card-title class="headline google-font" primary-title>Edit Notification</v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row align="center">
              <v-col cols="12" md="6" class="pa-1 ma-0">
                <v-text-field v-model="editDialogData.title" label="Title" type="text" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0">
                <v-text-field v-model="editDialogData.image" label="Image Link" type="url" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0 order-2 order-md-1">
                <v-textarea v-model="editDialogData.body" label="Body" type="text" outlined></v-textarea>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0 order-1 order-md-2">
                <v-img :src="(editDialogData.image.length > 10)?editDialogData.image:''"></v-img>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0">
                <v-text-field v-model="editDialogData.regLink" label="Reg Link" type="url" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0">
                <v-text-field
                  v-model="editDialogData.eventID"
                  label="Event ID"
                  type="text"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editDialog = false">Close</v-btn>
          <v-btn
            color="green"
            text
            :loading="isAdding"
            @click="updateNotification(editDialogData.id)"
          >Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="sendDialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Sending Notifications
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0 mt-1"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import firebase from "@/firebase";

import addNotification from "@/components/Admin/PushNotification/addNotification";

export default {
  name: "Push-Notifications",
  components: {
    addNotification
  },
  data: () => ({
    pushData: [],
    isLoading: false,
    search: "",
    isAdding: false,
    sendDialog:false,
    editDialogData: {
      id: "",
      body: "",
      image: "",
      title: "",
      eventID: "",
      regLink: ""
    },
    isSnackbar: false,
    snackBarText: "",
    viewDialog: false,
    dialogData: {},
    editDialog: false,
    headers: [
      {
        text: "Title",
        align: "left",
        value: "title"
      },
      { text: "Body", value: "body" },
      { text: "EventID", value: "eventID" },
      { text: "Sent times", value: "noTimeSend" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  // mounted(){

  // },
  methods: {
    view(item) {
      this.dialogData = item;
      this.viewDialog = true;
    },
    edit(item) {
      this.editDialogData.id = item.id;
      this.editDialogData.body = item.body;
      this.editDialogData.image = item.image;
      this.editDialogData.title = item.title;
      this.editDialogData.eventID = item.eventID;
      this.editDialogData.regLink = item.regLink;
      this.editDialog = true;
    },
    updateNotification(id) {
      this.isAdding = true;
      firebase.firestore
        .collection("pushNotifications")
        .doc(id)
        .update({
          body: this.editDialogData.body,
          title: this.editDialogData.title,
          image: this.editDialogData.image,
          regLink: this.editDialogData.regLink,
          eventID: this.editDialogData.eventID
        })
        .then(() => {
          this.isAdding = false;
          this.editDialog = false;
          this.snackBarText = "Updated Success";
          this.isSnackbar = true;
          this.loadData();
        });
    },
    addedd() {
      this.snackBarText = "Added Success";
      this.isSnackbar = true;
      this.loadData();
    },
    send(data) {
      this.sendDialog = true;
      firebase.firestore
        .collection("pushNotifications")
        .doc(data.id)
        .update({
          sentTime: new Date(),
          noTimeSend: data.noTimeSend + 1
        })
        .then(() => {
          firebase.firestore
            .collection("apiEnd")
            .get()
            .then(docs => {
              docs.forEach(doc => {
                let token = doc.data().token;
                let body = {
                  to: token,
                  notification: {
                    title: data.title,
                    body: {
                      body: data.body,
                      eventID: data.eventID,
                      regLink: data.regLink
                    },
                    tag: "newEvent",
                    image: data.image
                  }
                };
                const options = {
                  method: "POST",
                  headers: new Headers({
                    Authorization:
                      "key=AAAAJKAFx0g:APA91bG4RFcmV5d3PYgeNSXui0oCgcS8AqnTGe79Zv0X3udydnTnRM0r4EEQlWrpDPmOABVOTBbI3nCuST_3c1Z8yfyIPBwAa4jjoIOrzdocg3lsuJdpo4XIam01_Kk-mKUzaGjsqDep",
                    "Content-Type": "application/json"
                  })
                };
                options.body = JSON.stringify(body);
                fetch("https://fcm.googleapis.com/fcm/send", options)
                  .then(res => res.json())
                  .then(data => {
                    console.log(data);
                    if (data.failure == 1) {
                      firebase.firestore
                        .collection("apiEnd")
                        .doc(doc.id)
                        .delete()
                        .then(() => {
                          console.log("removed Success");
                        });
                    }
                  })
                  .catch(err => alert(err));
              });
              this.loadData();
              this.sendDialog = false;
            });
        });
    },
    getDate(date) {
      if (this.viewDialog && date.toString().length > 0) {
        return date
          .toDate()
          .toString()
          .split("(")[0];
      } else {
        return date;
      }
    },
    loadData() {
      this.pushData = [];
      this.isLoading = true;
      firebase.firestore
        .collection("pushNotifications")
        .get()
        .then(res => {
          res.forEach(doc => {
            let data = doc.data();
            data.id = doc.id;
            this.pushData.push(data);
          });
          this.isLoading = false;
        });
    }
  },
  created() {
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