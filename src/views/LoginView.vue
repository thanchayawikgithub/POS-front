<script setup lang="ts">
import { ref } from "vue";
import type { VForm } from "vuetify/components";
import { useLoginStore } from "@/stores/login";
const loginStore = useLoginStore();
const emit = defineEmits<{
  (e: "login", userName: string): void;
}>();
const loginName = ref("");
const password = ref("");
const valid = ref(true);
const form = ref<InstanceType<typeof VForm> | null>(null);
const login = async () => {
  const { valid } = await form.value!.validate();
  if (valid) {
    loginStore.login(loginName.value, password.value);
  }
};
const reset = () => {
  form.value?.reset();
};
</script>
<template>
  <v-app>
    <v-card>
      <v-img
        src="https://img.freepik.com/premium-vector/seamless-background-hand-drawn-coffee-equipment_108231-235.jpg?w=1380"
      >
        <v-card
          width="1000px"
          height="500"
          class="mx-auto pa-16 ma-16"
          style="flex: 100px"
          color="#413839"
        >
          <v-row>
            <v-col cols="6"> </v-col>
            <v-col cols="6">
              <v-card-title
                primary-title
                class="text-center text-h6 font-weight-bold"
              >
                Login
              </v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col clos="6">
              <v-img
                class="align-end"
                height="300px"
                src="https://i.pinimg.com/564x/0c/6a/78/0c6a788a868ad6793bbc56c9a4e1b59b.jpg"
                cover
              />
            </v-col>

            <v-col cols="6">
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    label="Login Name"
                    v-model="loginName"
                    :rules="[
                      (v) => !!v || 'Login Name is required',
                      (v) =>
                        v.length >= 4 ||
                        'Name must be more than or equal 4 characters',
                    ]"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    type="Password"
                    v-model="password"
                    :rules="[
                      (v) => !!v || 'Password is required',
                      (v) =>
                        v.length >= 8 ||
                        'Password must be more than or equal 8 characters',
                    ]"
                    required
                  ></v-text-field>
                </v-form>

                <pre></pre>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col clos="6" />
            <v-col cols="6">
              <v-card-actions class="justify-center">
                <v-btn color="success" @click="login">Login</v-btn>
                <v-btn color="error" @click="reset">Clear</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-img>
    </v-card>
  </v-app>
</template>
<style scoped></style>
