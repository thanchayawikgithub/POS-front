<script setup lang="ts">
import { ref } from "vue";
import type { VForm } from "vuetify/components";
import { useLoginStore } from "@/stores/login";
import ButtonCart from "@/components/order/ButtonCart.vue";

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
              <v-card-title
                primary-title
                class="text-center text-h6 font-weight-bold"
              >
                Login
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    label="Login Name"
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
                    type="Password"
                    v-model="password"
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
                <v-btn color="success" @click="login">Login</v-btn>
                <v-btn color="error" @click="reset">Clear</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-img>
  </v-app>
</template>
<style scoped></style>
