<script setup lang="ts">
import { ref } from "vue";
import type { VForm } from "vuetify/components";
import { useLoginStore } from "@/stores/login";
import ButtonCart from "@/components/order/ButtonCart.vue";
import { mdiEye, mdiEyeOff } from "@mdi/js";

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

const show2 = ref(true);
</script>
<template>
  <v-app>
    <v-img
      src="https://img.freepik.com/premium-vector/seamless-background-hand-drawn-coffee-equipment_108231-235.jpg?w=1380"
    >
      <v-card
        width="1000px"
        height="500"
        class="mx-auto ma-16"
        style="border-radius: 20px"
      >
        <v-row>
          <v-col cols="6">
            <v-card height="500" width="600" color="#C4945C">
              <v-img src="coffee.png" height="1000" class="ms-2">
              </v-img> </v-card
          ></v-col>

          <v-col cols="6" class="pl-0">
            <v-card
              height="500"
              width="500"
              class="mx-auto pa-16"
              style="border-radius: 10px"
              color="#FFF5EA"
              flat
            >
              <v-img src="logo.png" width="100px" class="mx-auto"></v-img>
              <v-card-title
                primary-title
                class="text-center text-h6 font-weight-bold"
              >
                <h3
                  style="
                    font-weight: bolder;
                    font-family: cursive;
                    color: #665540;
                  "
                >
                  Welcome to D-coffee
                </h3>
                <h4 style="font-family: cursive; color: #665540">
                  Plaese login to your account
                </h4>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    label="Name"
                    v-model="loginName"
                    variant="outlined"
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
                    :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    v-model="password"
                    @click:append-inner="show2 = !show2"
                    class="input-group--focused"
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

                <pre></pre>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn
                  variant="flat"
                  width="150px"
                  color="success"
                  style="border-radius: 10px"
                  @click="login"
                  >Login</v-btn
                >
                <v-btn
                  color="error"
                  variant="flat"
                  width="150px"
                  style="border-radius: 10px"
                  @click="reset"
                  >Clear</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-img>
  </v-app>
</template>
<style scoped></style>
