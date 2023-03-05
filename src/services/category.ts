import type Category from "@/types/Category";
import http from "./axios";
function getCategorys() {
  return http.get("/categorys");
}
function saveCategory(category: Category) {
  return http.post("/categorys", category);
}

function updateCategory(id: number, category: Category) {
  return http.patch(`/categorys/${id}`, category);
}

function deleteCategory(id: number) {
  return http.delete(`/categorys/${id}`);
}

export default { getCategorys, saveCategory, updateCategory, deleteCategory };
