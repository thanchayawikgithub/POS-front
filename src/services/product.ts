import type Category from "@/types/Category";
import type Product from "@/types/Product";
import http from "./axios";
function getProducts() {
  return http.get("/products");
}

function getProductsByCategory(category: number) {
  return http.get(`/products/category/${category}`);
}
function saveProduct(product: Product & { files: File[] }) {
  const formData = new FormData();
  formData.append("product_name", product.product_name);
  formData.append("product_type", product.product_type);
  formData.append("product_size", product.product_size);
  formData.append("product_price", `${product.product_price}`);
  formData.append("file", product.files[0]);
  formData.append("product_categoryId", `${product.categoryId}`);

  return http.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateProduct(id: number, product: Product & { files: File[] }) {
  const formData = new FormData();
  formData.append("product_name", product.product_name);
  formData.append("product_type", product.product_type);
  formData.append("product_size", product.product_size);
  formData.append("product_price", `${product.product_price}`);
  formData.append("categoryId", `${product.categoryId}`);
  if (product.files) {
    formData.append("file", product.files[0]);
  }
  return http.patch(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function deleteProduct(id: number) {
  return http.delete(`/products/${id}`);
}

export default {
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
