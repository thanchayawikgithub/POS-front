import type Product from "@/types/Product";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useLoadingStore } from "./loading";
import productService from "@/services/product";
import { useMessageStore } from "./message";

export const useProductStore = defineStore("product", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const isTable = ref(true);
  const checkDialog = ref();
  const deleteDialog = ref(false);
  const products = ref<Product[]>([]);
  const category = ref(1);
  const page = ref(1);
  const take = ref(10);
  const keyword = ref("");
  const lastPage = ref(0);
  const getByCatKeyword = ref("");
  const getByTypeKeyword = ref("All");

  const selectedType = ref<{
    type_id: number;
    type_list: { type_id: number; type_name: string }[];
  }>();
  const type = ref<
    { type_id: number; type_list: { type_id: number; type_name: string }[] }[]
  >([
    {
      type_id: 1,
      type_list: [
        {
          type_id: 1,
          type_name: "All",
        },
        {
          type_id: 2,
          type_name: "Coffee",
        },
        {
          type_id: 3,
          type_name: "Tea",
        },
        {
          type_id: 4,
          type_name: "Milk",
        },
        {
          type_id: 5,
          type_name: "Soda Drink",
        },
      ],
    },
    {
      type_id: 2,
      type_list: [
        {
          type_id: 1,
          type_name: "All",
        },
        {
          type_id: 2,
          type_name: "Cake",
        },
        {
          type_id: 3,
          type_name: "Bread",
        },
        {
          type_id: 4,
          type_name: "Cookie",
        },
      ],
    },
    {
      type_id: 3,
      type_list: [
        {
          type_id: 1,
          type_name: "All",
        },
        {
          type_id: 2,
          type_name: "Japanese Food",
        },
        {
          type_id: 3,
          type_name: "Italian Food",
        },
        {
          type_id: 4,
          type_name: "Thai Food",
        },
      ],
    },
  ]);

  const editedProduct = ref<Product & { files: File[] }>({
    product_name: "",

    product_type: "",

    product_size: "",

    product_size_unit: "",

    product_price: 0,

    categoryId: 1,

    product_image: "no_img_available.jpg",

    files: [],
  });

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedProduct.value = {
        product_name: "",

        product_type: "",

        product_size: "",

        product_size_unit: "",

        product_price: 0,

        categoryId: 1,

        product_image: "no_img_available.jpg",

        files: [],
      };
    }
  });

  watch(category, async (newCategory, oldCategory) => {
    getByTypeKeyword.value = "All";
    getByCatKeyword.value = "";
    selectedType.value = type.value.find(
      (type) => type.type_id === category.value
    );
    await getProductsByCategory(
      newCategory,
      getByCatKeyword.value,
      getByTypeKeyword.value
    );

    console.log(selectedType);
  });

  watch(page, async (newPage, oldPage) => {
    await getProducts();
  });

  watch(keyword, async (newKeyword, oldKeyword) => {
    await getProducts();
  });

  watch(getByCatKeyword, async (newGetByCatKeyword, oldGetByCatKeyword) => {
    await getProductsByCategory(
      category.value,
      newGetByCatKeyword,
      getByTypeKeyword.value
    );
    console.log(getByCatKeyword);
  });

  watch(getByTypeKeyword, async (newGetByTypeKeyword, oldGetByTypeKeyword) => {
    await getProductsByCategory(
      category.value,
      getByCatKeyword.value,
      newGetByTypeKeyword
    );
    console.log(getByTypeKeyword);
  });

  watch(lastPage, async (newLastPage, oldLastPage) => {
    if (newLastPage < page.value) {
      page.value = 1;
    }
  });

  async function getProductsByCategory(
    category: number,
    keyword?: string,
    type?: string
  ) {
    loadingStore.isLoading = true;
    try {
      const res = await productService.getProductsByCategory(
        category,
        keyword,
        type
      );
      products.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
    loadingStore.isLoading = false;
  }

  async function getProducts() {
    loadingStore.isLoading = true;
    try {
      const res = await productService.getProducts({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
      });
      products.value = res.data.data;
      lastPage.value = res.data.lastPage;
      console.log(products.value);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveProduct() {
    loadingStore.isLoading = true;
    try {
      if (editedProduct.value.product_id) {
        const res = await productService.updateProduct(
          editedProduct.value.product_id,
          editedProduct.value
        );
      } else {
        console.log(editedProduct.value);
        const res = await productService.saveProduct(editedProduct.value);
      }
      dialog.value = false;
      await getProducts();
    } catch (e) {
      messageStore.showError("ไม่สามารถบันทึก Product ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  async function deleteProduct(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await productService.deleteProduct(id);
      await getProducts();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบ Product ได้");
    }
    loadingStore.isLoading = false;
  }

  function editProduct(product: Product) {
    editedProduct.value = JSON.parse(JSON.stringify(product));
    dialog.value = true;
  }
  const UpdatePrice = ref(0);

  function updatePrice(priceDifference: number) {
    UpdatePrice.value = priceDifference;

    // if (UpdatePrice.value === 0) {
    //   UpdatePrice.value = priceDifference -= 5;
    // } else {
    //   UpdatePrice.value = UpdatePrice.value -= UpdatePrice.value;
    // }

    return UpdatePrice.value;
  }
  console.log(UpdatePrice);

  return {
    products,
    getProducts,
    dialog,
    editedProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    isTable,
    checkDialog,
    deleteDialog,
    category,
    getProductsByCategory,
    lastPage,
    page,
    keyword,
    getByCatKeyword,
    getByTypeKeyword,
    type,
    selectedType,
    updatePrice,
    UpdatePrice,
  };
});
