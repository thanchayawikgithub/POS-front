<script lang="ts" setup>
import { useEmployeeStore } from "@/stores/employee";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { useCheckInOutStore } from "@/stores/check-in-out";
const employeeStore = useEmployeeStore();
const checkInOutStore = useCheckInOutStore();
const username = ref("");
const password = ref("");
const valid = ref(true);
const form = ref<InstanceType<typeof VForm> | null>(null);
const checkIn = async () => {
  const { valid } = await form.value!.validate();
  if (valid) {
    checkInOutStore.checkIn(username.value, password.value);
  }
};
const reset = () => {
  form.value?.reset();
};

const show2 = ref(false);
</script>
<template>
  <v-dialog v-model="checkInOutStore.checkInDialog" persistent width="650">
    <v-card>
      <v-card-title>
        <span class="text-h5">Employee Check in</span>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-form ref="form" v-model="valid">
          <v-text-field
            class="mx-auto mb-2"
            style="width: 30vw"
            label="Name"
            v-model="username"
            variant="outlined"
            :rules="[
              (v) => !!v || 'Login Name is required',
              (v) =>
                v.length >= 4 || 'Name must be more than or equal 4 characters',
            ]"
            required
          ></v-text-field>
          <v-text-field
            style="width: 30vw"
            label="Password"
            :append-inner-icon="show2 ? mdiEye : mdiEyeOff"
            :type="show2 ? 'text' : 'password'"
            v-model="password"
            @click:append-inner="show2 = !show2"
            class="input-group--focused mx-auto"
            variant="outlined"
            :rules="[
              (v) => !!v || 'Password is required',
              (v) =>
                v.length >= 8 ||
                'Password must be more than or equal 8 characters',
            ]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center pa-0">
        <v-container>
          <v-row class="mx-4"> </v-row>
          <v-row class="justify-center">
            <v-btn
              variant="flat"
              width="150px"
              color="success"
              style="border-radius: 10px"
              @click="checkIn"
              >Check in</v-btn
            >
            <v-btn
              color="error"
              variant="flat"
              width="150px"
              style="border-radius: 10px"
              @click="reset"
              >Clear</v-btn
            >
          </v-row>
        </v-container>
      </v-card-actions>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="checkInOutStore.checkInDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
