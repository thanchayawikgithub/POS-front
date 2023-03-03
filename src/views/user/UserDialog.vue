<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import type { VForm } from "vuetify/components";
const userStore = useUserStore();
const form = ref<VForm | null>(null);
const save = async () => {
  const { valid } = await form.value!.validate();
  if (valid) {
    userStore.saveUser();
  }
};
const clear = () => {
  userStore.dialog = false;
  userStore.clear();
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="userStore.dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Login*"
                    v-model="userStore.editedUser.user_login"
                    required
                    :rules="[
                      (v) => !!v || 'Login จะต้องไม่มีชช่องว่าง',
                      (v) =>
                        v.length >= 5 ||
                        'Login จะต้องมีขนาดมากกว่าหรือเท่ากับ 5 ตัวอักษร',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    v-model="userStore.editedUser.user_name"
                    :rules="[
                      (v) => !!v || 'Name จะต้องไม่มีชช่องว่าง',
                      (v) =>
                        v.length >= 5 ||
                        'Name จะต้องมีขนาดมากกว่าหรือเท่ากับ 5 ตัวอักษร',
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    v-model="userStore.editedUser.user_password"
                    type="password"
                    required
                    :rules="[
                      (v) => !!v || 'Password จะต้องไม่มีชช่องว่าง',
                      (v) =>
                        v.length >= 8 ||
                        'Password จะต้องมีขนาดมากกว่าหรือเท่ากับ 8 ตัวอักษร',
                      (v) =>
                        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                          v
                        ) ||
                        'Password จะต้องมีตัวอักษรเล็กใหญ่และประกอบด้วยอักขระพิเศษ',
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Role"
                    v-model="userStore.editedUser.user_role"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="clear">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped></style>
