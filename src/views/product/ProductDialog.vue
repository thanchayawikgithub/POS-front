<script lang="ts" setup>
import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/product";
import { onMounted, ref } from "vue";
import type { VForm } from "vuetify/components";
const form = ref<VForm | null>(null);
const productStore = useProductStore();
const categoryStore = useCategoryStore();
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await productStore.saveProduct();
  }
}
onMounted(async () => {
  await categoryStore.getCategorys();
});
</script>

<template>
  <v-dialog v-model="productStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Product Profile</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="productStore.editedProduct.product_name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 4',
                  ]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="productStore.editedProduct.product_type"
                  :items="productStore.products"
                  item-title="product_type"
                  item-value="product_type"
                  label="Type"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Size*"
                  required
                  v-model="productStore.editedProduct.product_size"
                  :rules="[
                    (v) => v > 0 || 'Size must be equal to or greater than 0',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Size Unit*"
                  required
                  v-model="productStore.editedProduct.product_size_unit"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Price*"
                  required
                  v-model="productStore.editedProduct.product_price"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v >= 0 || 'Must have a price greater than 0',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="productStore.editedProduct.categoryId"
                  :items="categoryStore.categorys"
                  item-title="category_name"
                  item-value="category_id"
                  label="Category"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="productStore.editedProduct.files"
                  accept="image/*"
                  label="Image Input"
                >
                </v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="productStore.dialog = false"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>
