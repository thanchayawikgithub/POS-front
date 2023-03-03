import type Product from "@/types/Product";
import http from "./axios";
function getProducts() {
  return http.get("/users");
}
function saveProduct(product: Product) {
  return http.post("/users", product);
}

function updateProduct(id: number, product: Product) {
  return http.patch(`/users/${id}`, product);
}

function deleteProduct(id: number) {
  return http.delete(`/users/${id}`);
}

export default { getProducts, saveProduct, updateProduct, deleteProduct };
